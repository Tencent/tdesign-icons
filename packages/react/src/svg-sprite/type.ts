import { SVGAttributes, CSSProperties } from 'react';

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  /**
   * 尺寸
   * @default undefined
   */
  size?: 'small' | 'medium' | 'large' | string | number;

  /**
   * 样式
   */
  style?: CSSProperties;

  /**
   * 类名
   */
  className?: string;
}
