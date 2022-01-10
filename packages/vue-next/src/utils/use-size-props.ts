import { computed, ComputedRef } from 'vue';
import useCommonClassName from './use-common-classname';

// eslint-disable-next-line consistent-return
export default function useSizeProps(size?: ComputedRef<string | number>) {
  const COMMON_SIZE_CLASS_NAMES = useCommonClassName().SIZE;

  const className = computed(() => {
    if (size.value in COMMON_SIZE_CLASS_NAMES) {
      return COMMON_SIZE_CLASS_NAMES[size.value];
    }
    return '';
  });

  const style = computed(() => {
    if (size.value === undefined || size.value in COMMON_SIZE_CLASS_NAMES) {
      return {};
    }
    return {
      fontSize: size.value,
    };
  });

  return { style, className };
}
