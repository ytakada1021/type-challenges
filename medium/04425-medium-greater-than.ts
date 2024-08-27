/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array

  ### Question

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > View on GitHub: https://tsch.js.org/4425
*/

/* _____________ Your Code Here _____________ */

// convert string into number
// eg.
// StringToNum<"123"> -> 123
type StringToNum<S extends string> = S extends `${infer N extends number}` ? N : never;

// split number to tuple of digits
// eg.
// NumToDigitsTuple<"123"> -> ["1", "2", "3"]
type NumToDigitsTuple<N extends string> = N extends `${infer L}${infer R}` ? [L, ...NumToDigitsTuple<R>] : [];

// produce tuple of length N by adding elements (type U) to original tuple T
// eg.
// Fill<["1", "2"], "0", 5> -> ["0", "0", "0", "1", "2"]
type Fill<T extends string[], U extends string, N extends number> = T["length"] extends N ? T : Fill<[U, ...T], U, N>;

// produce tuple of length N
// eg.
// NumToZeroTuple<3> -> [0, 0, 0]
type NumToZeroTuple<N extends number, T extends unknown[] = []> = T["length"] extends N
  ? T
  : NumToZeroTuple<N, [...T, 0]>;

// compare length of two tuples
// eg.
// CompareByTupleLength<[0, 0], [0]> -> true
// CompareByTupleLength<[0], [0, 0]> -> false
// CompareByTupleLength<[0], [0]> -> false
type CompareTupleLength<T extends unknown[], U extends unknown[]> = T["length"] extends U["length"]
  ? false
  : T extends [unknown, ...infer TRest]
  ? U extends [unknown, ...infer URest]
    ? CompareTupleLength<TRest, URest>
    : true
  : false;

// eg.
// CompareDigitsTuple<["1", "2"], ["1", "1"]> -> true
// CompareDigitsTuple<["1", "2"], ["1", "3"]> -> false
// CompareDigitsTuple<["1", "2"], ["1", "2"]> -> false
type CompareDigitsTuple<T extends string[], U extends string[]> = T extends [
  infer TFirst extends string,
  ...infer TRest extends string[]
]
  ? U extends [infer UFirst extends string, ...infer URest extends string[]]
    ? TFirst extends UFirst
      ? CompareDigitsTuple<TRest, URest>
      : CompareTupleLength<NumToZeroTuple<StringToNum<TFirst>>, NumToZeroTuple<StringToNum<UFirst>>>
    : never
  : false;

type GreaterThan<T extends number, U extends number> = CompareDigitsTuple<
  Fill<NumToDigitsTuple<`${T}`>, "0", 15>,
  Fill<NumToDigitsTuple<`${U}`>, "0", 15>
>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4425/answer
  > View solutions: https://tsch.js.org/4425/solutions
  > More Challenges: https://tsch.js.org
*/
