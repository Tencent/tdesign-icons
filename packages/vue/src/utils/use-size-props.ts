import useCommonClassName from './use-common-classname';
import { StyledProps } from './styled-props';

export default function useSizeProps(size?: string | number): StyledProps {
  if (size === undefined) {
    return {
      className: '',
      style: {},
    };
  }
  const COMMON_SIZE_CLASS_NAMES = useCommonClassName().SIZE;

  if (!(size in COMMON_SIZE_CLASS_NAMES)) {
    return {
      className: '',
      style: { fontSize: size },
    };
  }

  return {
    className: COMMON_SIZE_CLASS_NAMES[size],
    style: {},
  };
}
