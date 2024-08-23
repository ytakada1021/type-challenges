/*
  9142 - CheckRepeatedChars
  -------
  by Hong (@RThong) #medium #union #string

  ### Question

  Implement type ```CheckRepeatedChars<S>``` which will return whether type ```S``` contains duplicated chars?

  For example:

  ```ts
  type CheckRepeatedChars<'abc'>   // false
  type CheckRepeatedChars<'aba'>   // true
  ```

  > View on GitHub: https://tsch.js.org/9142
*/

/* _____________ Your Code Here _____________ */

// if T includes S, return true
type Includes<T extends string, S extends string> = T extends `${infer F}${infer R}`
  ? Equal<F, S> extends true
    ? true
    : Includes<R, S>
  : false;

// produce unique characters of type parameter S
type Unique<S extends string> = S extends `${infer F}${infer R}`
  ? Includes<R, F> extends true
    ? Unique<R>
    : `${F}${Unique<R>}`
  : "";

type StringToTuple<S extends string> = S extends `${infer F}${infer R}`
  ? [F, ...StringToTuple<R>]
  : [];

type CheckRepeatedChars<T extends string> = StringToTuple<T>["length"] extends StringToTuple<
  Unique<T>
>["length"]
  ? false
  : true;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  Expect<Equal<CheckRepeatedChars<"abc">, false>>,
  Expect<Equal<CheckRepeatedChars<"abb">, true>>,
  Expect<Equal<CheckRepeatedChars<"cbc">, true>>,
  Expect<Equal<CheckRepeatedChars<"">, false>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9142/answer
  > View solutions: https://tsch.js.org/9142/solutions
  > More Challenges: https://tsch.js.org
*/
