/*
  274 - Integers Comparator
  -------
  by Pig Fang (@g-plane) #extreme #template-literal #math

  ### Question

  Implement a type-level integers comparator. We've provided an enum for indicating the comparison result, like this:

  - If `a` is greater than `b`, type should be `Comparison.Greater`.
  - If `a` and `b` are equal, type should be `Comparison.Equal`.
  - If `a` is lower than `b`, type should be `Comparison.Lower`.

  **Note that `a` and `b` can be positive integers or negative integers or zero, even one is positive while another one is negative.**

  > View on GitHub: https://tsch.js.org/274
*/

/* _____________ Your Code Here _____________ */

enum Comparison {
  Greater,
  Equal,
  Lower,
}

type ReverseString<S extends string> = S extends `${infer First}${infer Rest}` ? `${ReverseString<Rest>}${First}` : "";

type TupleOfLength<N extends number, Result extends 0[] = []> = Result["length"] extends N
  ? Result
  : TupleOfLength<N, [...Result, 0]>;

type CompareDigit<StrL extends string, StrR extends string> = StrL extends StrR
  ? Comparison.Equal
  : StrL extends `${infer L extends number}`
  ? StrR extends `${infer R extends number}`
    ? TupleOfLength<L> extends [...TupleOfLength<R>, ...unknown[]]
      ? Comparison.Greater
      : Comparison.Lower
    : never
  : never;

type CompareAbsolute<
  A extends string,
  B extends string,
  Previous extends Comparison = Comparison.Equal
> = A extends `${infer FirstA}${infer RestA}`
  ? B extends `${infer FirstB}${infer RestB}`
    ? CompareAbsolute<
        RestA,
        RestB,
        CompareDigit<FirstA, FirstB> extends infer R extends Comparison
          ? R extends Comparison.Equal
            ? Previous
            : R
          : never
      >
    : Comparison.Greater
  : B extends `${infer _}${infer _}`
  ? Comparison.Lower
  : Previous;

type Comparator<
  A extends number,
  B extends number,
  AbsA extends number = `${A}` extends `-${infer Abs extends number}` ? Abs : A,
  AbsB extends number = `${B}` extends `-${infer Abs extends number}` ? Abs : B,
  AbsComparison extends Comparison = CompareAbsolute<ReverseString<`${AbsA}`>, ReverseString<`${AbsB}`>>
> = `${A}` extends `-${number}`
  ? `${B}` extends `-${number}`
    ? AbsComparison extends Comparison.Lower
      ? Comparison.Greater
      : AbsComparison extends Comparison.Greater
      ? Comparison.Lower
      : Comparison.Equal
    : Comparison.Lower
  : `${B}` extends `-${number}`
  ? Comparison.Greater
  : AbsComparison;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

  Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
  Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
  Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
  Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

  // Extra tests if you like to challenge yourself!
  Expect<Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>>,
  Expect<Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>>,
  Expect<Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/274/answer
  > View solutions: https://tsch.js.org/274/solutions
  > More Challenges: https://tsch.js.org
*/
