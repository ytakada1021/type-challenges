/*
  30430 - Tower of hanoi
  -------
  by null (@aswinsvijay) #medium #array

  ### Question

  Simulate the solution for the Tower of Hanoi puzzle. Your type should take the number of rings as input an return an array of steps to move the rings from tower A to tower B using tower C as additional. Each entry in the array should be a pair of strings `[From, To]` which denotes ring being moved `From -> To`.

  [Wikipedia](https://en.wikipedia.org/wiki/Tower_of_Hanoi)
  [GeeksForGeeks](https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi)

  > View on GitHub: https://tsch.js.org/30430
*/

/* _____________ Your Code Here _____________ */

// 1. Bを使用して、N-1枚の円盤をAからCに移動する
// 2. 最後の円盤をAからBに移動する
// 3. Aを使用して、N-1枚の円盤をCからBに移動する

type NumberToTuple<N extends number, Result extends 0[] = []> = Result["length"] extends N
  ? Result
  : NumberToTuple<N, [...Result, 0]>;

type MinusOne<N extends number> = NumberToTuple<N> extends [unknown, ...infer Rest] ? Rest["length"] : -1;

type Hanoi<N extends number, From = "A", To = "B", Intermediate = "C"> = N extends 0
  ? []
  : [...Hanoi<MinusOne<N>, From, Intermediate, To>, [From, To], ...Hanoi<MinusOne<N>, Intermediate, To, From>];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type Tests = [
  Expect<Equal<Hanoi<0>, []>>,
  Expect<Equal<Hanoi<1>, [["A", "B"]]>>,
  Expect<Equal<Hanoi<2>, [["A", "C"], ["A", "B"], ["C", "B"]]>>,
  Expect<Equal<Hanoi<3>, [["A", "B"], ["A", "C"], ["B", "C"], ["A", "B"], ["C", "A"], ["C", "B"], ["A", "B"]]>>,
  Expect<
    Equal<
      Hanoi<5>,
      [
        ["A", "B"],
        ["A", "C"],
        ["B", "C"],
        ["A", "B"],
        ["C", "A"],
        ["C", "B"],
        ["A", "B"],
        ["A", "C"],
        ["B", "C"],
        ["B", "A"],
        ["C", "A"],
        ["B", "C"],
        ["A", "B"],
        ["A", "C"],
        ["B", "C"],
        ["A", "B"],
        ["C", "A"],
        ["C", "B"],
        ["A", "B"],
        ["C", "A"],
        ["B", "C"],
        ["B", "A"],
        ["C", "A"],
        ["C", "B"],
        ["A", "B"],
        ["A", "C"],
        ["B", "C"],
        ["A", "B"],
        ["C", "A"],
        ["C", "B"],
        ["A", "B"]
      ]
    >
  >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30430/answer
  > View solutions: https://tsch.js.org/30430/solutions
  > More Challenges: https://tsch.js.org
*/
