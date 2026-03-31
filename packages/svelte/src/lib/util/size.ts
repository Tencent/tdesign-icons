const CLASS_PREFIX = 't';

const SIZE_CLASS_NAMES: Record<string, string> = {
  default: '',
  xs: `${CLASS_PREFIX}-size-xs`,
  small: `${CLASS_PREFIX}-size-s`,
  medium: `${CLASS_PREFIX}-size-m`,
  large: `${CLASS_PREFIX}-size-l`,
  xl: `${CLASS_PREFIX}-size-xl`,
  block: `${CLASS_PREFIX}-size-full-width`,
};

export function getSizeClassName(size?: string | number): string {
  if (typeof size === 'undefined') return '';
  if (typeof size === 'string' && size in SIZE_CLASS_NAMES) {
    return SIZE_CLASS_NAMES[size];
  }
  return '';
}

export function getSizeStyle(size?: string | number): string {
  if (typeof size === 'undefined') return '';
  if (typeof size === 'string' && size in SIZE_CLASS_NAMES) {
    return '';
  }
  if (typeof size === 'number') {
    return `font-size: ${size}px`;
  }
  return `font-size: ${size}`;
}
