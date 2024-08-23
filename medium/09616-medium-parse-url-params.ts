/*
  9616 - Parse URL Params
  -------
  by Anderson. J (@andersonjoseph) #medium #infer #string #template-literal

  ### Question

  You're required to implement a type-level parser to parse URL params string into an Union.

  ```ts
  ParseUrlParams<':id'> // id
  ParseUrlParams<'posts/:id'> // id
  ParseUrlParams<'posts/:id/:user'> // id | user
  ```

  > View on GitHub: https://tsch.js.org/9616
*/

/* _____________ Your Code Here _____________ */

type Explode<T extends string, U extends string> = T extends `${infer L}${U}${infer R}`
  ? L | Explode<R, U>
  : T extends ""
  ? never
  : T;

type ParseUrlParams<T extends string> = T extends ""
  ? never
  : Explode<T, "/"> & `:${string}` extends `:${infer P}`
  ? P
  : never;

// better solution (in GitHub issue)
// type ParseUrlParams<T> = T extends `${string}:${infer R}`
//   ? R extends `${infer P}/${infer L}`
//     ? P | ParseUrlParams<L>
//     : R
//   : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  Expect<Equal<ParseUrlParams<"">, never>>,
  Expect<Equal<ParseUrlParams<":id">, "id">>,
  Expect<Equal<ParseUrlParams<"posts/:id">, "id">>,
  Expect<Equal<ParseUrlParams<"posts/:id/">, "id">>,
  Expect<Equal<ParseUrlParams<"posts/:id/:user">, "id" | "user">>,
  Expect<Equal<ParseUrlParams<"posts/:id/:user/like">, "id" | "user">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9616/answer
  > View solutions: https://tsch.js.org/9616/solutions
  > More Challenges: https://tsch.js.org
*/
