import type { SVGAttributes, ClassValue } from 'svelte/elements';

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  style?: string;
  class?: ClassValue;
  size?: 'small' | 'medium' | 'large' | string | number;
  strokeWidth?: number;
  strokeColor?: string | string[];
  fillColor?: string | string[];
}

export interface Attrs {
  [key: string]: any;
}

export interface IconElement {
  tag: string;
  attrs: Attrs;
  children?: IconElement[];
}

export interface IconFulfilledProps extends IconProps {
  icon: IconElement;
  id: string;
}
