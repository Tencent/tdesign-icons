/**
 * 表示组件支持通过 className 和 style 进行样式定制
 */
export interface StyledProps {
  /**
   * 组件自定义类名
   */
  className?: string;

  /**
   * 组件自定义样式
   */
  style?: React.CSSProperties;
}
