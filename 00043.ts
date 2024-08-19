type MyExclude<T, U extends T> = T extends U ? never : T;

type Result = MyExclude<"a" | "b" | "c", "a">; // 'b' | 'c'

// ユニオン分配
// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
