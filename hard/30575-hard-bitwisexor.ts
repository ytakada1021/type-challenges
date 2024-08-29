/*
  30575 - BitwiseXOR
  -------
  by jiangshan (@jiangshanmeta) #hard

  ### Question

  Implement ```BitwiseXOR<S1,S2>``` which takes two binary string literal type and returns a binary string that reprents the bitwise XOR of S1 and S2

  For example:

  ```typescript
  BitwiseXOR<'0','1'> // expect '1'
  BitwiseXOR<'1','1'> // expect '0'
  BitwiseXOR<'10','1'>  // expect '11'
  ```

  > View on GitHub: https://tsch.js.org/30575
*/

/* _____________ Your Code Here _____________ */

type Reverse<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Reverse<Rest>}${First}`
  : "";

type BitwiseXORReversed<
  S1 extends string,
  S2 extends string
> = S1 extends `${infer S1First}${infer S1Rest}`
  ? S2 extends `${infer S2First}${infer S2Rest}`
    ? `${BitwiseXORReversed<S1Rest, S2Rest>}${S1First extends S2First ? "0" : "1"}`
    : Reverse<S1>
  : Reverse<S2>;

type BitwiseXOR<S1 extends string, S2 extends string> = BitwiseXORReversed<
  Reverse<S1>,
  Reverse<S2>
>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  Expect<Equal<BitwiseXOR<"0", "1">, "1">>,
  Expect<Equal<BitwiseXOR<"1", "1">, "0">>,
  Expect<Equal<BitwiseXOR<"10", "1">, "11">>,
  Expect<Equal<BitwiseXOR<"110", "1">, "111">>,
  Expect<Equal<BitwiseXOR<"101", "11">, "110">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30575/answer
  > View solutions: https://tsch.js.org/30575/solutions
  > More Challenges: https://tsch.js.org
*/
