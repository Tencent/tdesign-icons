<script lang="ts">
  import type { IconFulfilledProps, IconElement, IconProps } from './types.js';
  import { getSizeStyle, getSizeClassName } from './util/size.js';
  import { loadStylesheet } from './util/check-url-and-load.js';
  import { renderIconToSvgString } from './util/render.js';

  let {
    icon,
    id,
    class: className = '',
    size = undefined,
    style = '',
    strokeWidth = 2,
    strokeColor = 'currentColor',
    fillColor = 'transparent',
    ...restProps
  }: IconFulfilledProps = $props();

  const sizeClassName = $derived(getSizeClassName(size));
  const sizeStyle = $derived(getSizeStyle(size));
  const cls = $derived(
    ['t-icon', `t-icon-${id}`, className, sizeClassName].filter(Boolean).join(' ')
  );
  const mergedStyle = $derived(
    ['fill: none', style, sizeStyle].filter(Boolean).join('; ')
  );

  const childProps = $derived({
    strokeWidth,
    strokeColor1: Array.isArray(strokeColor) ? strokeColor[0] : strokeColor,
    strokeColor2: Array.isArray(strokeColor) ? (strokeColor[1] ?? strokeColor[0]) : strokeColor,
    fillColor1: Array.isArray(fillColor) ? fillColor[0] : fillColor,
    fillColor2: Array.isArray(fillColor) ? (fillColor[1] ?? fillColor[0]) : fillColor,
    filledColor: !fillColor ? 'currentColor' : (Array.isArray(fillColor) ? fillColor[0] : fillColor),
  });

  const innerHtml = $derived(
    icon.children
      ? icon.children.map((child, index) => renderIconToSvgString(child, childProps, index)).join('')
      : ''
  );

  $effect(() => {
    loadStylesheet();
  });
</script>

<svg
  {...icon.attrs}
  {...restProps}
  class={cls}
  style={mergedStyle}
>
  {@html innerHtml}
</svg>
