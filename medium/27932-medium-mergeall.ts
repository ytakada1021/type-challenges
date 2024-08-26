/*
  27932 - MergeAll
  -------
  by scarf (@scarf005) #medium #object #array #union

  ### Question

  Merge variadic number of types into a new type. If the keys overlap, its values should be merged into an union.

  For example:

  ```ts
  type Foo = { a: 1; b: 2 }
  type Bar = { a: 2 }
  type Baz = { c: 3 }

  type Result = MergeAll<[Foo, Bar, Baz]> // expected to be { a: 1 | 2; b: 2; c: 3 }
  ```

  > View on GitHub: https://tsch.js.org/27932
*/

/* _____________ Your Code Here _____________ */

type MergeAll<XS> = XS extends [infer F, ...infer R]
  ? MergeAll<R> extends infer U
    ? Omit<
        {
          [P in keyof F & keyof U]: F[P] | U[P];
        } & Omit<F, keyof F & keyof U> &
          Omit<U, keyof F & keyof U>,
        never
      >
    : never
  : {};

// better solution in issues
// type MergeAll<XS extends object[], T = XS[number], K extends PropertyKey = T extends T ? keyof T : never> = {
//   [P in K]: T extends T ? T[P & keyof T] : never;
// };

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  Expect<Equal<MergeAll<[]>, {}>>,
  Expect<Equal<MergeAll<[{ a: 1 }]>, { a: 1 }>>,
  Expect<Equal<MergeAll<[{ a: string }, { a: string }]>, { a: string }>>,
  Expect<Equal<MergeAll<[{}, { a: string }]>, { a: string }>>,
  Expect<Equal<MergeAll<[{ a: 1 }, { c: 2 }]>, { a: 1; c: 2 }>>,
  Expect<Equal<MergeAll<[{ a: 1; b: 2 }, { a: 2 }, { c: 3 }]>, { a: 1 | 2; b: 2; c: 3 }>>,
  Expect<Equal<MergeAll<[{ a: 1 }, { a: number }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: number }, { a: 1 }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: 1 | 2 }, { a: 1 | 3 }]>, { a: 1 | 2 | 3 }>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/27932/answer
  > View solutions: https://tsch.js.org/27932/solutions
  > More Challenges: https://tsch.js.org
*/
