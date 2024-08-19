type Concat<T extends unknown[], P extends unknown[]> = T extends [...infer U]
  ? P extends [...infer Q]
    ? [...U, ...Q]
    : never
  : never;

type Result = Concat<[1], [2]>; // expected to be [1, 2]
