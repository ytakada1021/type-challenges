/*
  216 - Slice
  -------
  by Anthony Fu (@antfu) #extreme #array

  ### Question

  Implement the JavaScript `Array.slice` function in the type system. `Slice<Arr, Start, End>` takes the three argument. The output should be a subarray of `Arr` from index `Start` to `End`. Indexes with negative numbers should be counted from reversely.

  For example

  ```ts
  type Arr = [1, 2, 3, 4, 5]
  type Result = Slice<Arr, 2, 4> // expected to be [3, 4]
  ```

  > View on GitHub: https://tsch.js.org/216
*/

/* _____________ Your Code Here _____________ */

// e.g.
// NumberToTuple<3> -> [0, 0, 0]
type NumberToTuple<N extends number, Result extends 0[] = []> = Result["length"] extends N
  ? Result
  : NumberToTuple<N, [...Result, 0]>;

// e.g.
// Minus<4, 3> -> 1
type Minus<M extends number, N extends number> = NumberToTuple<M> extends [...NumberToTuple<N>, ...infer Result]
  ? Result["length"]
  : never;

type Slice<
  Arr extends unknown[],
  Start extends number = 0,
  End extends number = Arr["length"],
  Counter extends 0[] = [], // counter (the length represents current index)
  Result extends unknown[] = [] // result list
> =
  // convert negative start index to positive value
  `${Start}` extends `-${infer AbsStart extends number}`
    ? Slice<Arr, Minus<Arr["length"], AbsStart>, End>
    : // convert negative end index to positive value
    `${End}` extends `-${infer AbsEnd extends number}`
    ? Slice<Arr, Start, Minus<Arr["length"], AbsEnd>>
    : //
    Arr extends [infer First, ...infer Rest]
    ? // if reaches end index, return result
      Counter["length"] extends End
      ? Result
      : // if reaches start index, add value to result list.
      Counter["length"] extends Start
      ? Slice<Rest, Start, End, [...Counter, 0], [...Result, First]>
      : //
      Result["length"] extends 0
      ? // if result length is 0, assume that index is before start index
        Slice<Rest, Start, End, [...Counter, 0], Result>
      : // if result length is not zero, assume that index is between start and end index (we should add value to result list)
        Slice<Rest, Start, End, [...Counter, 0], [...Result, First]>
    : Result;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type Arr = [1, 2, 3, 4, 5];

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/216/answer
  > View solutions: https://tsch.js.org/216/solutions
  > More Challenges: https://tsch.js.org
*/
