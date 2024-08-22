/*
  5317 - LastIndexOf
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Implement the type version of ```Array.lastIndexOf```, ```LastIndexOf<T, U>```  takes an Array ```T```, any ```U``` and returns the index of the last ```U``` in Array ```T```

  For example:

  ```typescript
  type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
  type Res2 = LastIndexOf<[0, 0, 0], 2> // -1
  ```

  > View on GitHub: https://tsch.js.org/5317
*/

/* _____________ Your Code Here _____________ */

// this type takes two type parameters (T: tuple, V: any value), and returns tuple with elements before last appearance of V
// eg. TruncateTupleByValue<[1, 2, 3, 2, 3], 2> produces [1, 2, 3]
type TruncateTupleByValue<T extends unknown[], V> = T extends [...infer F, infer R]
  ? Equal<R, V> extends true
    ? F
    : TruncateTupleByValue<F, V>
  : [];

// index of U corresponds to the length of truncated tuple
// if length of truncated tuple is 0, U does not exist in T, and should return -1
type LastIndexOf<T extends unknown[], U> = TruncateTupleByValue<T, U> extends [...infer S]
  ? S extends []
    ? -1
    : S["length"]
  : never;

// better version
// type LastIndexOf<T extends unknown[], U> = T extends [...infer F, infer R]
//   ? Equal<R, U> extends true
//     ? F["length"]
//     : LastIndexOf<F, U>
//   : -1;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, "a", number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, "a", any, 1], any>, 5>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5317/answer
  > View solutions: https://tsch.js.org/5317/solutions
  > More Challenges: https://tsch.js.org
*/
