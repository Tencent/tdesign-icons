/**
 * TS 无法直接 extends Union Type，但是可以 extends 一个 TypeAlias
```ts
  // 示例用法
  export interface ButtonProps extends Combine<
    StyledProps,
    React.ButtonHTMLAttributes<HTMLButtonElement>
  > {}
```
 */
export type Combine<A, B, C = {}, D = {}, E = {}, F = {}> = A & B & C & D & E & F;

/**
 * 获取类型中值类型是指定类型的属性名
```ts
  // 示例用法
  type A = {
    foo: string;
    bar: number;
  };

  // B is "foo"
  type B = MatchPropertyNames<A, string>;
```
 */
export type MatchPropertyNames<S, T> = {
  [P in keyof S]: S[P] extends T ? P : never;
}[keyof S];

/**
 * 获取类型的子集，只包含值为指定类型的属性
```ts
  // 示例用法
  type A = {
    foo: string;
    bar: number;
  };

  // B is { foo: string }
  type B = MatchProperties<A, string>;
```
 */
export type MatchProperties<S, T> = Pick<S, MatchPropertyNames<S, T>>;

/**
 * 获取已有组件的 props 类型
```ts
  // 示例用法
  function Foo(props: { foo: string, bar: number }) {
    return <div />;
  }
  // FooProps is { foo: string, bar: number }
  type FooProps = InferProps<typeof Foo>;
```
 */
export type InferProps<C> = C extends React.ComponentType<infer P> ? P : never;
