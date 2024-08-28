/*
  9155 - ValidDate
  -------
  by ch3cknull (@ch3cknull) #hard

  ### Question

  Implement a type `ValidDate`, which takes an input type T and returns whether T is a valid date.

  **Leap year is not considered**

  Good Luck!

  ```ts
  ValidDate<'0102'> // true
  ValidDate<'0131'> // true
  ValidDate<'1231'> // true
  ValidDate<'0229'> // false
  ValidDate<'0100'> // false
  ValidDate<'0132'> // false
  ValidDate<'1301'> // false
  ```

  > View on GitHub: https://tsch.js.org/9155
*/

/* _____________ Your Code Here _____________ */

type AddZeroPadding<S extends string> = S extends `${1 | 2 | 3}${number}` ? S : `0${S}`;

type Range<
  End extends number,
  Result extends string = never,
  Counter extends unknown[] = [unknown]
> = Counter["length"] extends End
  ? Result | AddZeroPadding<`${Counter["length"]}`>
  : Range<End, Result | AddZeroPadding<`${Counter["length"]}`>, [...Counter, unknown]>;

type ValidDate<T extends string> = T extends
  | `${"01" | "03" | "05" | "07" | "08" | "11" | "12"}${Range<31>}`
  | `${"04" | "06" | "09" | "11"}${Range<30>}`
  | `02${Range<28>}`
  ? true
  : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../util-types";

type cases = [
  Expect<Equal<ValidDate<"0102">, true>>,
  Expect<Equal<ValidDate<"0131">, true>>,
  Expect<Equal<ValidDate<"1231">, true>>,
  Expect<Equal<ValidDate<"0229">, false>>,
  Expect<Equal<ValidDate<"0100">, false>>,
  Expect<Equal<ValidDate<"0132">, false>>,
  Expect<Equal<ValidDate<"1301">, false>>,
  Expect<Equal<ValidDate<"0123">, true>>,
  Expect<Equal<ValidDate<"01234">, false>>,
  Expect<Equal<ValidDate<"">, false>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9155/answer
  > View solutions: https://tsch.js.org/9155/solutions
  > More Challenges: https://tsch.js.org
*/
