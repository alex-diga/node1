/** 根据使用范围，可以将工具类型划分为：
 * 操作接口类型
 * 联合类型
 * 函数类型
 * 字符串类型
 */

// Partial
type MPartial<T> = {
  [P in keyof T]: T[P];
};

// Required
type MRequired<T> = {
  [P in keyof T]-?: T[P];
};

// Readonly
type MReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Pick
type MPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
// Omit
type MOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// 联合类型
// Exclude
type MExclude<T, U> = T extends U ? never : T;

// Extract
type MExtract<T, U> = T extends U ? T : never;

// NonNullable
type MNonNullable<T> = T & {};

// Record
type MRecord<K extends keyof any, T> = {
  [P in K]: T;
};

// 函数类型
// ConstructorParameters
type MConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;

// Parameters
type MParameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

// ReturnType
type MReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;

// ThisParameterType
type MThisParameterType<T> = T extends (this: infer U, ...args: never) => any
  ? U
  : never;

// ThisType
interface MThisType<T> {}

// OmitThisParameter

type MOmitThisParameter<T> = unknown extends ThisParameterType<T>
  ? T
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T;

// 字符串类型
// Uppercase
// Lowercase
// Capitalize
// Uncapitalize
