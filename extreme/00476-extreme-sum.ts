/*
  476 - Sum
  -------
  by null (@uid11) #extreme #math #template-literal

  ### Question

  Implement a type `Sum<A, B>` that summing two non-negative integers and returns the sum as a string. Numbers can be specified as a string, number, or bigint.

  For example,

  ```ts
  type T0 = Sum<2, 3> // '5'
  type T1 = Sum<'13', '21'> // '34'
  type T2 = Sum<'328', 7> // '335'
  type T3 = Sum<1_000_000_000_000n, '123'> // '1000000000123'
  ```

  > View on GitHub: https://tsch.js.org/476
*/

/* _____________ Your Code Here _____________ */

type MapAdd = [
  [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9]],
  [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [1, 0]],
  [[0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [1, 0], [1, 1]],
  [[0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [1, 0], [1, 1], [1, 2]],
  [[0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [1, 0], [1, 1], [1, 2], [1, 3]],
  [[0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4]],
  [[0, 6], [0, 7], [0, 8], [0, 9], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5]],
  [[0, 7], [0, 8], [0, 9], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6]],
  [[0, 8], [0, 9], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7]],
  [[0, 9], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8]]
];

type Add<M extends number[], N extends number[]> = M extends [
  ...infer MRest extends number[],
  infer MLast extends number
]
  ? N extends [...infer NRest extends number[], infer NLast extends number]
    ? MapAdd[MLast][NLast] extends [infer TensPlace1 extends number, infer OnesPlace1]
      ? [...Add<MRest, [TensPlace1]>, OnesPlace1] extends [...infer Rest2 extends number[], infer OnesPlace2]
        ? [...Add<Rest2, NRest>, OnesPlace2]
        : never
      : never
    : M
  : N;

type StringToNumber<S extends string> = S extends `${infer M extends number}` ? M : never;

type StringToTuple<N extends string> = `${N}` extends `${infer A}${infer B}`
  ? [StringToNumber<A>, ...StringToTuple<B>]
  : [];

type Join<M extends number[]> = M extends [infer First extends number, ...infer Rest extends number[]]
  ? `${First}${Join<Rest>}`
  : "";

type Format<M extends number[]> = M extends [0, ...infer Rest extends number[]]
  ? Format<Rest>
  : M extends []
  ? Join<[0]>
  : Join<M>;

type Sum<A extends string | number | bigint, B extends string | number | bigint> = Format<
  Add<StringToTuple<`${A}`>, StringToTuple<`${B}`>>
>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  Expect<Equal<Sum<2, 3>, "5">>,
  Expect<Equal<Sum<"13", "21">, "34">>,
  Expect<Equal<Sum<"328", 7>, "335">>,
  Expect<Equal<Sum<1_000_000_000_000n, "123">, "1000000000123">>,
  Expect<Equal<Sum<9999, 1>, "10000">>,
  Expect<Equal<Sum<4325234, "39532">, "4364766">>,
  Expect<Equal<Sum<728, 0>, "728">>,
  Expect<Equal<Sum<"0", 213>, "213">>,
  Expect<Equal<Sum<0, "0">, "0">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/476/answer
  > View solutions: https://tsch.js.org/476/solutions
  > More Challenges: https://tsch.js.org
*/
