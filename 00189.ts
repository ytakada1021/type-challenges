type MyAwaited<T> = T extends Promise<infer U> ? U : never;

type ExampleType = Promise<string>;

type R = MyAwaited<ExampleType>; // string
