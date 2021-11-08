import useCommonClassName from '../util/use-common-classname';
import { StyledProps } from './type';

export default function useSizeProps(size: string | number): StyledProps {
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
