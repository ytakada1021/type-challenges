/*
  34286 - Take Elements
  -------
  by Eirik Måseidvåg (@Eirmas) #hard #array

  ### Question

  Implement a type `Take<N, Arr>` that returns the first `N` elements from an array `Arr`. If `N` is negative, return the last `|N|` elements

  For example,
  ```ts
  type T0 = Take<2, [1, 2, 3]> // [1, 2]
  type T1 = Take<3, ['1', 2, true, false]> // ['1', 2, true]
  type T2 = Take<-2, [1, 2, 3]> // [2, 3]
  type T3 = Take<0, [1, 2, 3]> // []
  type T4 = Take<5, [1, 2, 3]> // [1, 2, 3]
  type T5 = Take<3, []> // []
  ```

  > View on GitHub: https://tsch.js.org/34286
*/

/* _____________ Your Code Here _____________ */

// reverse order of T
// eg.
// Reverse<[1, 2, 3]> -> [3, 2, 1]
// Reverse<[]> -> []
type Reverse<T extends unknown[]> = T extends [infer First, ...infer Rest] ? [...Reverse<Rest>, First] : [];

type Take<
  N extends number,
  Arr extends unknown[],
  Result extends unknown[] = []
> = `${N}` extends `-${infer A extends number}`
  ? Reverse<Take<A, Reverse<Arr>>>
  : Result["length"] extends N
  ? Result
  : Arr extends [infer First, ...infer Rest extends unknown[]]
  ? Take<N, Rest, [...Result, First]>
  : Result;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  Expect<Equal<Take<2, [1, 2, 3]>, [1, 2]>>,
  Expect<Equal<Take<3, ["1", 2, true, false]>, ["1", 2, true]>>,
  Expect<Equal<Take<-2, [1, 2, 3]>, [2, 3]>>,
  Expect<Equal<Take<0, [1, 2, 3]>, []>>,
  Expect<Equal<Take<5, [1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<Take<3, []>, []>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/34286/answer
  > View solutions: https://tsch.js.org/34286/solutions
  > More Challenges: https://tsch.js.org
*/
