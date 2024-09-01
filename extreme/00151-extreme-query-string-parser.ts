/*
  151 - Query String Parser
  -------
  by Pig Fang (@g-plane) #extreme #template-literal

  ### Question

  You're required to implement a type-level parser to parse URL query string into a object literal type.

  Some detailed requirements:

  - Value of a key in query string can be ignored but still be parsed to `true`. For example, `'key'` is without value, so the parser result is `{ key: true }`.
  - Duplicated keys must be merged into one. If there are different values with the same key, values must be merged into a tuple type.
  - When a key has only one value, that value can't be wrapped into a tuple type.
  - If values with the same key appear more than once, it must be treated as once. For example, `key=value&key=value` must be treated as `key=value` only.

  > View on GitHub: https://tsch.js.org/151
*/

/* _____________ Your Code Here _____________ */

// extract keys as union from query string
type ExtractKey<Q extends string> = Q extends `${infer L}&${infer R}`
  ? L extends `${infer Key}=${string}`
    ? Key | ExtractKey<R>
    : L | ExtractKey<R>
  : Q extends `${infer Key}=${string}`
  ? Key
  : Q extends ""
  ? never
  : Q;

// add item to tuple if not contained
type AddIfNotExists<T extends unknown[], U> = U extends T[number] ? T : [...T, U];

// extract values as tuple from query string
type ExtractValue<
  Q extends string,
  Key extends string,
  Result extends unknown[] = []
> = Q extends `${string}${Key}&${infer Rest}`
  ? ExtractValue<Rest, Key, AddIfNotExists<Result, true>>
  : Q extends `${string}${Key}=${infer Value}&${infer Rest}`
  ? ExtractValue<Rest, Key, AddIfNotExists<Result, Value>>
  : Q extends `${string}${Key}`
  ? AddIfNotExists<Result, true>
  : Q extends `${string}${Key}=${infer Value}`
  ? AddIfNotExists<Result, Value>
  : Result;

type ParseQueryString<Q extends string> = {
  [P in ExtractKey<Q>]: ExtractValue<Q, P> extends infer U ? (U extends [infer E] ? E : U) : never;
};

// タプルの順序が違うのでテストにひっかかる答え
// type KeyValue = [string, unknown];
// type ToKeyValues<Q extends string> = Q extends `${infer First}&${infer Rest}`
//   ? First extends `${infer K}=${infer V}`
//     ? [[K, V], ...ToKeyValues<Rest>]
//     : [[First, true], ...ToKeyValues<Rest>]
//   : Q extends `${infer K}=${infer V}`
//   ? [[K, V]]
//   : [[Q, true]];
// type IsUnion<T, U = T> = [T] extends [never] ? false : T extends T ? ([U] extends [T] ? false : true) : never;
// type UnionToInterSection<T> = (T extends T ? (x: T) => void : never) extends (x: infer I) => void ? I : void;
// type UnionToTuple<T, U = T> = UnionToInterSection<T extends T ? () => T : never> extends () => infer R
//   ? [R, ...UnionToTuple<Exclude<U, R>>]
//   : [];
// type ParseQueryString<Q extends string, T extends KeyValue = ToKeyValues<Q>[number]> = {
//   [P in T[0]]: (T & [P, unknown])[1] extends infer U ? (IsUnion<U> extends true ? UnionToTuple<U> : U) : never;
// };

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  Expect<Equal<ParseQueryString<"">, {}>>,
  Expect<Equal<ParseQueryString<"k1">, { k1: true }>>,
  Expect<Equal<ParseQueryString<"k1&k1">, { k1: true }>>,
  Expect<Equal<ParseQueryString<"k1&k2">, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<"k1=v1">, { k1: "v1" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v2">, { k1: ["v1", "v2"] }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k2=v2">, { k1: "v1"; k2: "v2" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k2=v2&k1=v2">, { k1: ["v1", "v2"]; k2: "v2" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k2">, { k1: "v1"; k2: true }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v1">, { k1: "v1" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v2&k1=v1">, { k1: ["v1", "v2"] }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k2=v1&k1=v2&k1=v1">, { k1: ["v1", "v2"]; k2: "v1" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k2=v2&k1=v2&k1=v3">, { k1: ["v1", "v2", "v3"]; k2: "v2" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1">, { k1: ["v1", true] }>>,
  Expect<Equal<ParseQueryString<"k1&k1=v1">, { k1: [true, "v1"] }>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/151/answer
  > View solutions: https://tsch.js.org/151/solutions
  > More Challenges: https://tsch.js.org
*/
