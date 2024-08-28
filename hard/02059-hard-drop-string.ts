/*
  2059 - Drop String
  -------
  by CaptainOfPhB (@CaptainOfPhB) #hard #template-literal #infer

  ### Question

  Drop the specified chars from a string.

  For example:

  ```ts
  type Butterfly = DropString<'foobar!', 'fb'> // 'ooar!'
  ```

  > View on GitHub: https://tsch.js.org/2059
*/

/* _____________ Your Code Here _____________ */

type StringToCharUnion<S extends string> = S extends `${infer First}${infer Rest}`
  ? First | StringToCharUnion<Rest>
  : never;

type DropString<
  S extends string,
  R extends string,
  CharUnion = StringToCharUnion<R>
> = S extends `${infer First}${infer Rest}`
  ? First extends CharUnion
    ? DropString<Rest, R, CharUnion>
    : `${First}${DropString<Rest, R, CharUnion>}`
  : "";

// better solution in issues
// type DropString<S, R> = S extends `${infer First}${infer Rest}`
//   ? R extends `${string}${First}${string}`
//     ? DropString<Rest, R>
//     : `${First}${DropString<Rest, R>}`
//   : "";

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  Expect<Equal<DropString<"butter fly!", "">, "butter fly!">>,
  Expect<Equal<DropString<"butter fly!", " ">, "butterfly!">>,
  Expect<Equal<DropString<"butter fly!", "but">, "er fly!">>,
  Expect<Equal<DropString<" b u t t e r f l y ! ", "but">, "     e r f l y ! ">>,
  Expect<Equal<DropString<"    butter fly!        ", " ">, "butterfly!">>,
  Expect<Equal<DropString<" b u t t e r f l y ! ", " ">, "butterfly!">>,
  Expect<Equal<DropString<" b u t t e r f l y ! ", "but">, "     e r f l y ! ">>,
  Expect<Equal<DropString<" b u t t e r f l y ! ", "tub">, "     e r f l y ! ">>,
  Expect<Equal<DropString<" b u t t e r f l y ! ", "b">, "  u t t e r f l y ! ">>,
  Expect<Equal<DropString<" b u t t e r f l y ! ", "t">, " b u   e r f l y ! ">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2059/answer
  > View solutions: https://tsch.js.org/2059/solutions
  > More Challenges: https://tsch.js.org
*/
