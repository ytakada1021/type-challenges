/*
  31447 - CountReversePairs
  -------
  by jiangshan (@jiangshanmeta) #extreme

  ### Question

  Given an integer array nums, return the number of reverse pairs in the array.

  A reverse pair is a pair (i, j) where:

  * 0 <= i < j < nums.length and
  * nums[i] > nums[j].

  > View on GitHub: https://tsch.js.org/31447
*/

/* _____________ Your Code Here _____________ */

type TupleOfLength<N extends number, Result extends 0[] = []> = Result["length"] extends N
  ? Result
  : TupleOfLength<N, [...Result, 0]>;

// if L is greater than R, return true, else false
type Greater<L extends number, R extends number> = `${L}` extends `-${infer AbsL extends number}`
  ? `${R}` extends `-${infer AbsR extends number}`
    ? TupleOfLength<AbsL> extends [...TupleOfLength<AbsR>, ...unknown[]]
      ? false
      : true
    : false
  : `${R}` extends `-${number}`
  ? true
  : TupleOfLength<L> extends [...TupleOfLength<R>, unknown, ...unknown[]]
  ? true
  : false;

type ExtractReversePairs<N extends number, T extends number[]> = T extends [
  infer First extends number,
  ...infer Rest extends number[]
]
  ? Greater<N, First> extends true
    ? [[N, First], ...ExtractReversePairs<N, Rest>]
    : ExtractReversePairs<N, Rest>
  : [];

type CountReversePairs<T extends number[], U extends unknown[] = []> = T extends [
  infer First extends number,
  ...infer Rest extends number[]
]
  ? CountReversePairs<Rest, [...U, ...ExtractReversePairs<First, Rest>]>
  : U["length"];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  Expect<Equal<CountReversePairs<[5, 2, 6, 1]>, 4>>,
  Expect<Equal<CountReversePairs<[1, 2, 3, 4]>, 0>>,
  Expect<Equal<CountReversePairs<[-1, -1]>, 0>>,
  Expect<Equal<CountReversePairs<[-1]>, 0>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/31447/answer
  > View solutions: https://tsch.js.org/31447/solutions
  > More Challenges: https://tsch.js.org
*/
