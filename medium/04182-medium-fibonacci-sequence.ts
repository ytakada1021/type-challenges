/*
  4182 - Fibonacci Sequence
  -------
  by windliang (@wind-liang) #medium

  ### Question

  Implement a generic `Fibonacci<T>` that takes a number `T` and returns its corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

  The sequence starts:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

  For example
  ```ts
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```

  > View on GitHub: https://tsch.js.org/4182
*/

/* _____________ Your Code Here _____________ */

type NumToTuple<N extends number, R extends 0[] = []> = R["length"] extends N
  ? R
  : NumToTuple<N, [...R, 0]>;

type Add<A extends number, B extends number> = [...NumToTuple<A>, ...NumToTuple<B>]["length"];

type MinusOne<A extends number> = NumToTuple<A> extends [unknown, ...infer R] ? R["length"] : -1;

// 再帰が深すぎるのでコンパイルエラー
// 再帰を使わないadd, minusを実装してから見直す
type Fibonacci<T extends number> = T extends 1 | 2
  ? 1
  : Add<Fibonacci<MinusOne<T>>, Fibonacci<MinusOne<MinusOne<T>>>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4182/answer
  > View solutions: https://tsch.js.org/4182/solutions
  > More Challenges: https://tsch.js.org
*/
