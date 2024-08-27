/*
  112 - Capitalize Words
  -------
  by Anthony Fu (@antfu) #hard #template-literal

  ### Question

  Implement `CapitalizeWords<T>` which converts the first letter of **each word of a string** to uppercase and leaves the rest as-is.

  For example

  ```ts
  type capitalized = CapitalizeWords<'hello world, my friends'> // expected to be 'Hello World, My Friends'
  ```

  > View on GitHub: https://tsch.js.org/112
*/

/* _____________ Your Code Here _____________ */

type LowercaseAll<S extends string> = S extends S ? S | Lowercase<S> : never;

// prettier-ignore
type Alphabet = LowercaseAll<"A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z">;

type CapitalizeWords<
  S extends string,
  IsHead extends boolean = true
> = S extends `${infer L extends Alphabet}${infer M extends Alphabet}${infer R}`
  ? `${IsHead extends true ? Uppercase<L> : L}${M}${CapitalizeWords<R, false>}`
  : S extends `${infer L}${infer M extends Alphabet}${infer R}`
  ? `${L}${Uppercase<M>}${CapitalizeWords<R, false>}`
  : S extends `${infer L extends Alphabet}${infer M}${infer R}`
  ? `${IsHead extends true ? Uppercase<L> : L}${CapitalizeWords<`${M}${R}`, false>}`
  : S extends `${infer L}${infer M}${infer R}`
  ? `${L}${CapitalizeWords<`${M}${R}`, false>}`
  : S;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  Expect<Equal<CapitalizeWords<"foobar">, "Foobar">>,
  Expect<Equal<CapitalizeWords<"FOOBAR">, "FOOBAR">>,
  Expect<Equal<CapitalizeWords<"foo bar">, "Foo Bar">>,
  Expect<Equal<CapitalizeWords<"foo bar hello world">, "Foo Bar Hello World">>,
  Expect<Equal<CapitalizeWords<"foo bar.hello,world">, "Foo Bar.Hello,World">>,
  Expect<
    Equal<
      CapitalizeWords<"aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq">,
      "Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq"
    >
  >,
  Expect<Equal<CapitalizeWords<"">, "">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/112/answer
  > View solutions: https://tsch.js.org/112/solutions
  > More Challenges: https://tsch.js.org
*/
