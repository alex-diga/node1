/**
 * typescript 体操 easy 题目
 */

interface Todo {
  title: string;
  description: string;
  completed: boolean;
  list: number[]
}
type List = [1, 2, 3, 4, 5]
type Tuple = ['a', 'b', 'c', 'd', 'e']


/* pick */
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
type todo = Pick<Todo, 'title' | 'completed'>
type MyTodo = MyPick<Todo, 'title' | 'completed'>


/* readonly */
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}
type todo1 = Readonly<Todo>
type ReadonlyTodo = MyReadonly<Todo>

/* 数组 */
type FirstArray<T extends any[]> = T extends [infer P, ...infer Rest] ? P : never;
type FirstList = FirstArray<List>

/* 对 TS 来说，元组和数组都是数组但元组对 TS 来说可以观测其长度，T['length'] 对元组来说返回的是具体值，而对数组来说返回的是 number。 */
/* 元组长度 */
type LengthOfTuple<T extends any[]> = T['length']
type length = LengthOfTuple<Tuple>
type ListLength = LengthOfTuple<List>


/* Exclude */
type MyExclude<T, U> = T extends U ? never : T;
type ExcludeRes = MyExclude<'a' | 'b', 'a' | 'c'>


/* Awaited 从 Promise<ExampleType> 拿到 ExampleType */
type MyAwaited<T> = T extends Promise<infer P> ? P : never;
type AwaitedRes = MyAwaited<Promise<string[]>>

type MyAwaited1<T extends Promise<unknown>> =
  T extends Promise<infer P> ?
  P extends Promise<unknown> ? MyAwaited1<P> : P
  : never;

type AwaitedRes1 = MyAwaited1<Promise<string[]>>


/* IF */
type If<C, T, F> = C extends true ? T : F;
type IfRes = If<true, Todo, List>
type IfRes1 = If<false, Todo, List>


/* Concat */
type Concat<T, U> = [
  ...T extends any[] ? T : [T],
  ...U extends any[] ? U : [U]
]
type ConcatRes = Concat<List, Tuple>
type ConcatRes1 = Concat<List, 10>


/* Includes */
type MySimpleIncludes<T extends any[], U> = U extends T[number] ? true : false
type SimpleIncludesRes1 = MySimpleIncludes<List, 1>
type SimpleIncludesRes2 = MySimpleIncludes<[boolean], false> // true, 是反例出错

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;
type MyIncludes<T extends any[], K> =
  T extends [infer P, ...infer Rest] ?
  Equal<P, K> extends true ? true : MyIncludes<Rest, K>
  : false

type IncludesRes = MyIncludes<List, 1>
type IncludesRes1 = MyIncludes<List, 10>
type IncludesRes2 = MyIncludes<[boolean], false> // false


/* Push */
type MyPush<T extends any[], K> = [...T, K]
type PushRes = MyPush<List, 10>
type PushRes1 = MyPush<List, [10]>


/* Unshift */
type MyUnshift<T extends any[], K> = [K, ...T]
type UnshiftRes = MyUnshift<List, 10>


/* Parameters */
type TestFn = (type: string, cb: (...args: string[]) => void) => void;
type MyParameters<T> = T extends (...args: infer P) => any ? P : never;
type ParametersRes = Parameters<TestFn>
type MyParametersRes = MyParameters<TestFn>

// [精读《type challenges - easy》](https://juejin.cn/post/7105936475396685855)