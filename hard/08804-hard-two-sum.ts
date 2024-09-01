/*
  8804 - Two Sum
  -------
  by PsiloLau (@Psilocine) #hard #array #math

  ### Question

  Given an array of integers `nums` and an integer `target`, return true if two numbers such that they add up to `target`.

  For example

  ```ts
  type sum1 = TwoSum<[3, 2, 4], 6> // true
  type sum2 = TwoSum<[2, 7, 11, 15], 15> // false
  ```

  > View on GitHub: https://tsch.js.org/8804
*/

/* _____________ Your Code Here _____________ */

type NumberToTuple<N extends number, Result extends unknown[] = []> = Result["length"] extends N
  ? Result
  : NumberToTuple<N, [...Result, unknown]>;

type Add<A extends number, B extends number> = [...NumberToTuple<A>, ...NumberToTuple<B>]["length"];

type AddEach<A extends number, T extends number[]> = T extends [
  infer First extends number,
  ...infer Rest extends number[]
]
  ? [Add<A, First>, ...AddEach<A, Rest>]
  : [];

type TwoSumList<T extends number[]> = T extends [infer First extends number, ...infer Rest extends number[]]
  ? [...AddEach<First, Rest>, ...TwoSumList<Rest>]
  : [];

type TwoSum<T extends number[], U extends number> = U extends TwoSumList<T>[number] ? true : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
  Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8804/answer
  > View solutions: https://tsch.js.org/8804/solutions
  > More Challenges: https://tsch.js.org
*/
