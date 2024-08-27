/*
  32532 - Binary Addition
  -------
  by Finley Garton (@finleygn) #hard #recursion #array

  ### Question

  Implement `BinaryAdd` to add two binary numbers together. The numbers should not be translated out of binary at any point.

  Note the two inputs will always have the same length.

  > View on GitHub: https://tsch.js.org/32532
*/

/* _____________ Your Code Here _____________ */

type Bit = 1 | 0;

// Add one to A
// eg.
// AddOne<[1, 0]> -> [1, 1]
// AddOne<[1, 1]> -> [1, 0, 0]
type AddOne<A extends Bit[]> = A extends [...infer Rest extends Bit[], infer Last]
  ? Last extends 0
    ? [...Rest, 1]
    : [...AddOne<Rest>, 0]
  : [1];

type BinaryAdd<A extends Bit[], B extends Bit[]> = B extends [...infer BRest extends Bit[], infer BLast]
  ? BLast extends 1
    ? AddOne<A> extends [...infer ARest extends Bit[], infer ALast]
      ? [...BinaryAdd<ARest, BRest>, ALast]
      : never
    : A extends [...infer ARest extends Bit[], infer ALast]
    ? [...BinaryAdd<ARest, BRest>, ALast]
    : B
  : A;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  Expect<Equal<BinaryAdd<[1], [1]>, [1, 0]>>,
  Expect<Equal<BinaryAdd<[0], [1]>, [1]>>,
  Expect<Equal<BinaryAdd<[1, 1, 0], [0, 0, 1]>, [1, 1, 1]>>,
  Expect<
    Equal<
      BinaryAdd<[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]>,
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
    >
  >,
  Expect<Equal<BinaryAdd<[1, 0, 1, 0, 1, 1, 1, 0], [1, 0, 0, 0, 1, 1, 0, 0]>, [1, 0, 0, 1, 1, 1, 0, 1, 0]>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/32532/answer
  > View solutions: https://tsch.js.org/32532/solutions
  > More Challenges: https://tsch.js.org
*/
