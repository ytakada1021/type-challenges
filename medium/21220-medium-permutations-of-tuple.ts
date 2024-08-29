/*
  21220 - Permutations of Tuple
  -------
  by null (@gaac510) #medium #union #tuple #conditional type #recursion

  ### Question

  Given a generic tuple type `T extends unknown[]`, write a type which produces all permutations of `T` as a union.

  For example:

  ```ts
  PermutationsOfTuple<[1, number, unknown]>
  // Should return:
  // | [1, number, unknown]
  // | [1, unknown, number]
  // | [number, 1, unknown]
  // | [unknown, 1, number]
  // | [number, unknown, 1]
  // | [unknown, number ,1]
  ```

  > View on GitHub: https://tsch.js.org/21220
*/

/* _____________ Your Code Here _____________ */

// type Permutation<T, U = T> = [T] extends [never]
//   ? []
//   : T extends T
//   ? [T, ...Permutation<Exclude<U, T>>]
//   : never;

// type PermutationsOfTuple<R extends unknown[]> = Permutation<R[number]>;

type PermutationsOfTuple<R extends unknown[], L extends unknown[] = []> = R extends [
  infer First,
  ...infer Rest
]
  ?
      | [First, ...PermutationsOfTuple<[...Rest, ...L]>]
      | (Rest["length"] extends 0 ? never : PermutationsOfTuple<Rest, [...L, First]>)
  : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect, ExpectFalse } from "../util-types";

type cases = [
  Expect<Equal<PermutationsOfTuple<[]>, []>>,
  Expect<Equal<PermutationsOfTuple<[any]>, [any]>>,
  Expect<Equal<PermutationsOfTuple<[any, unknown]>, [any, unknown] | [unknown, any]>>,
  Expect<
    Equal<
      PermutationsOfTuple<[any, unknown, never]>,
      | [any, unknown, never]
      | [unknown, any, never]
      | [unknown, never, any]
      | [any, never, unknown]
      | [never, any, unknown]
      | [never, unknown, any]
    >
  >,
  Expect<
    Equal<
      PermutationsOfTuple<[1, number, unknown]>,
      | [1, number, unknown]
      | [1, unknown, number]
      | [number, 1, unknown]
      | [unknown, 1, number]
      | [number, unknown, 1]
      | [unknown, number, 1]
    >
  >,
  ExpectFalse<Equal<PermutationsOfTuple<[1, number, unknown]>, [unknown]>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/21220/answer
  > View solutions: https://tsch.js.org/21220/solutions
  > More Challenges: https://tsch.js.org
*/
