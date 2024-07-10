import { getCommonClassName } from './classname';

export interface StyledProps {
  /**
   * 组件自定义类名
   */
  className?: string;

  /**
   * 组件自定义样式
   */
  style?: Partial<CSSStyleDeclaration>;
}

export default function getSizeProps(size?: string | number): StyledProps {
  const COMMON_SIZE_CLASS_NAMES = getCommonClassName().SIZE;

  if (typeof size === 'undefined') {
    return {};
  }

  if (!(size in COMMON_SIZE_CLASS_NAMES)) {
    return {
      className: '',
      style: { fontSize: typeof size === 'number' ? `${size}px` : size },
    };
  }

  return {
    className: COMMON_SIZE_CLASS_NAMES[size],
    style: {},
  };
}
