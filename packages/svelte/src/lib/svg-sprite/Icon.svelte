<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';
  import { getSizeStyle, getSizeClassName } from '../util/size.js';
  import { loadScript, loadStylesheet } from '../util/check-url-and-load.js';

  interface SpriteIconProps extends SVGAttributes<SVGSVGElement> {
    /** 图标类型 */
    name?: string;
    /** 图标地址 */
    url?: string | string[];
    /** @default true */
    loadDefaultIcons?: boolean;
    /** 尺寸 */
    size?: 'small' | 'medium' | 'large' | string | number;
    /** 样式 */
    style?: string;
    /** 类名 */
    class?: string;
  }

  const CDN_SVGSPRITE_URL = 'https://tdesign.gtimg.com/icon/0.4.1/fonts/index.js';
  const classPrefix = 't';

  let {
    name = '',
    size = undefined,
    url = undefined,
    loadDefaultIcons = true,
    class: customClassName = '',
    style: customStyle = '',
    ...restProps
  }: SpriteIconProps = $props();

  const sizeClassName = $derived(getSizeClassName(size));
  const sizeStyle = $derived(getSizeStyle(size));

  const iconClass = $derived.by(() => {
    const iconName = url ? name : `${classPrefix}-icon-${name}`;
    return [`${classPrefix}-icon`, iconName, sizeClassName, customClassName].filter(Boolean).join(' ');
  });

  const mergedStyle = $derived(
    [customStyle, sizeStyle].filter(Boolean).join('; ')
  );

  const xlinkHref = $derived(url ? `#${name}` : `#t-icon-${name}`);

  $effect(() => {
    loadStylesheet();
  });

  $effect(() => {
    if (loadDefaultIcons) {
      loadScript(CDN_SVGSPRITE_URL, `${classPrefix}-svg-js-stylesheet--unique-class`);
    }
  });

  $effect(() => {
    if (url) {
      const urls = Array.isArray(url) ? url : [url];
      urls.forEach((u) => {
        loadScript(u, `${classPrefix}-svg-js-stylesheet--unique-class`);
      });
    }
  });
</script>

<svg class={iconClass} style={mergedStyle} {...restProps}>
  <use href={xlinkHref} />
</svg>
