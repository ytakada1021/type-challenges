/*
  27152 - Triangular number
  -------
  by null (@aswinsvijay) #medium #tuple #array #math

  ### Question

  Given a number N, find the Nth triangular number, i.e. `1 + 2 + 3 + ... + N`

  > View on GitHub: https://tsch.js.org/27152
*/

/* _____________ Your Code Here _____________ */

type NumToTuple<N extends number, T extends unknown[] = []> = T["length"] extends N
  ? T
  : NumToTuple<N, [...T, unknown]>;

type Triangular<
  N extends number,
  T extends unknown[] = NumToTuple<N>,
  U extends unknown[] = []
> = T extends [unknown, ...infer Rest] ? Triangular<N, Rest, [...U, ...T]> : U["length"];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  Expect<Equal<Triangular<0>, 0>>,
  Expect<Equal<Triangular<1>, 1>>,
  Expect<Equal<Triangular<3>, 6>>,
  Expect<Equal<Triangular<10>, 55>>,
  Expect<Equal<Triangular<20>, 210>>,
  Expect<Equal<Triangular<55>, 1540>>,
  Expect<Equal<Triangular<100>, 5050>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/27152/answer
  > View solutions: https://tsch.js.org/27152/solutions
  > More Challenges: https://tsch.js.org
*/
