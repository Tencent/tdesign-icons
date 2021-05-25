import { SyntheticEvent } from 'react';

/**
 * 表单受控组件中，输入输出的统一规范
 *
 * - `value` 用于输入组件当前值
 * - `onChange` 用于回调组件最新值
 */
export interface ControlledProps<
  V,
  E extends SyntheticEvent = SyntheticEvent,
  C extends ChangeContext<E> = ChangeContext<E>
> {
  /**
   * 未提供 `value` 的情况下，提供了 `defaultValue`，则可以当做是非受控组件使用
   */
  defaultValue?: V;

  /**
   * 当前值
   */
  value?: V;

  /**
   * 值发生变更时进行回调
   * - `value` 变更的目标值
   * - `context` 此次变更的更多上下文信息，其中 `context.event` 可以获得导致变更的 React 事件
   */
  onChange?(value: V, context: C): void;
}

/**
 * 表单 `onChange` 事件中，提供的上下文信息
 */
export interface ChangeContext<E extends SyntheticEvent = SyntheticEvent> {
  /**
   * 触发 `onChange` 事件的事件对象
   */
  event: E;
}
