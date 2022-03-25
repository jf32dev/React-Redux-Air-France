export type StrictExclude<T, U extends T> = T extends U ? never : T;
export type StrictExtract<T, U extends T> = T extends U ? T : never;
export type Nullable<T> = T | null | undefined;
