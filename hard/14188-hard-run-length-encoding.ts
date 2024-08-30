/*
  14188 - Run-length encoding
  -------
  by Hen Hedymdeith (@alfaproxima) #hard

  ### Question

  Given a `string` sequence of a letters f.e. `AAABCCXXXXXXY`. Return run-length encoded string `3AB2C6XY`.
  Also make a decoder for that string.

  > View on GitHub: https://tsch.js.org/14188
*/

/* _____________ Your Code Here _____________ */

type Sequence<S extends string, N extends number, Counter extends 0[] = []> = Counter["length"] extends N
  ? ""
  : `${S}${Sequence<S, N, [...Counter, 0]>}`;

namespace RLE {
  export type Encode<
    S extends string,
    Result extends string = "",
    Stack extends string[] = []
  > = S extends `${infer First}${infer Rest}`
    ? Stack extends First[]
      ? Encode<Rest, Result, [...Stack, First]>
      : Encode<Rest, `${Result}${Stack["length"] extends 1 ? "" : Stack["length"]}${Stack[number]}`, [First]>
    : Stack extends []
    ? Result
    : `${Result}${Stack["length"] extends 1 ? "" : Stack["length"]}${Stack[number]}`;

  export type Decode<S extends string> = S extends `${infer N extends number}${infer A}${infer Rest}`
    ? `${Sequence<A, N>}${Decode<Rest>}`
    : S extends `${infer A}${infer Rest}`
    ? `${A}${Decode<Rest>}`
    : "";
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<"AAABCCXXXXXXY">, "3AB2C6XY">>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<"3AB2C6XY">, "AAABCCXXXXXXY">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/14188/answer
  > View solutions: https://tsch.js.org/14188/solutions
  > More Challenges: https://tsch.js.org
*/
