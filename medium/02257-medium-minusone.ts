/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */

// 再帰の回数制限にひっかかる答え
// type NumToTuple<A extends number | bigint, R extends unknown[] = []> = R["length"] extends A
//   ? R
//   : NumToTuple<A, [...R, 0]>;
// type MinusOne<T extends number> = NumToTuple<T> extends [unknown, ...infer R] ? R["length"] : -1;

type MapMinusOne = {
  "0": "9";
  "1": "0";
  "2": "1";
  "3": "2";
  "4": "3";
  "5": "4";
  "6": "5";
  "7": "6";
  "8": "7";
  "9": "8";
};

// split number to tuple of digits
// eg.
// "12" -> ["1", "2"]
// "5" -> ["5"]
type SplitToDigit<A extends string> = A extends `${infer L}${infer R}`
  ? R extends ""
    ? [L]
    : [L, ...SplitToDigit<R>]
  : [];

// minus one from ones place
// eg.
// ["1", "2"] -> ["1", "1"]
// ["1", "0"] -> ["0", "9"]
// ["0"] -> ["-1"]
type MinusOneTuple<T extends string[]> = T extends [...infer L extends string[], infer R extends keyof MapMinusOne]
  ? R extends "0"
    ? L extends []
      ? ["-1"]
      : [...MinusOneTuple<L>, "9"]
    : [...L, MapMinusOne[R]]
  : [];

// eg.
// ["0", "9", "9"] -> ["9", "9"]
// ["0"] -> ["0"]
// ["1", "2"] -> ["1", "2"]
type RemoveHeadZero<T extends string[]> = T extends [infer L, ...infer R]
  ? L extends "0"
    ? R extends []
      ? ["0"]
      : R
    : T
  : [];

// eg.
// ["1", "2"] => "12"
type TupleToNumber<T extends string[]> = T extends [infer L extends string, ...infer R extends string[]]
  ? `${L}${TupleToNumber<R>}`
  : "";

type MinusOne<T extends number> = TupleToNumber<
  RemoveHeadZero<MinusOneTuple<SplitToDigit<`${T}`>>>
> extends `${infer U extends number}`
  ? U
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
