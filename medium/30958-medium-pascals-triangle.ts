/*
  30958 - Pascal's triangle
  -------
  by Aswin S Vijay (@aswinsvijay) #medium #array #math

  ### Question

  Given a number N, construct the Pascal's triangle with N rows.
  [Wikipedia](https://en.wikipedia.org/wiki/Pascal%27s_triangle)

  > View on GitHub: https://tsch.js.org/30958
*/

/* _____________ Your Code Here _____________ */

// type Row<T extends unknown[] = []> = T extends [infer First, infer Second, ...infer Rest] ?

type Num = 0[];

// produce new row from previous row T (number is represented as tuple length)
// eg.
// NewRow<[[0]]>      -> [[0], [0]]         (represents [1] -> [1, 1])
// NewRow<[[0], [0]]> -> [[0], [0, 0], [0]] (represents [1, 1] -> [1, 2, 1])
type NewRow<T extends Num[], Result extends Num[] = []> = Result["length"] extends 0
  ? NewRow<T, [[0]]>
  : T["length"] extends 0
  ? Result
  : T extends [infer First extends Num, infer Second extends Num, ...infer Rest extends Num[]]
  ? NewRow<[Second, ...Rest], [...Result, [...First, ...Second]]>
  : [...Result, [0]];

// eg.
// Convert<[[0], [0, 0], [0]]> -> [1, 2, 1]
type Convert<T extends Num[]> = T extends [infer First extends Num, ...infer Rest extends Num[]]
  ? [First["length"], ...Convert<Rest>]
  : [];

type Pascal<
  N extends number,
  Result extends unknown[] = [],
  Previous extends Num[] = []
> = Result["length"] extends N
  ? Result
  : NewRow<Previous> extends infer U extends Num[]
  ? Pascal<N, [...Result, Convert<U>], U>
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

// prettier-ignore
type cases = [
  Expect<
    Equal<
      Pascal<1>,
      [
        [1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<3>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<5>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<7>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
        [1, 5, 10, 10, 5, 1],
        [1, 6, 15, 20, 15, 6, 1],
      ]
    >
  >,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30958/answer
  > View solutions: https://tsch.js.org/30958/solutions
  > More Challenges: https://tsch.js.org
*/
