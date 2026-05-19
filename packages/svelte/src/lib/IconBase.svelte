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
    fillColor = undefined,
    ...restProps
  }: IconFulfilledProps = $props();

  const sizeClassName = $derived(getSizeClassName(size));
  const sizeStyle = $derived(getSizeStyle(size));
  const cls = $derived(['t-icon', `t-icon-${id}`, sizeClassName, className]);
  const mergedStyle = $derived(
    ['fill: none', style, sizeStyle].filter(Boolean).join('; ')
  );

  const childProps = $derived.by(() => {
    // 双色描边图标的兜底色：未指定时为 'transparent'
    // 填充图标（filled）的兜底色：未指定时为 'currentColor'，由 color/style.color 控制
    const hasFillColor = fillColor !== undefined && fillColor !== null && fillColor !== '';
    const fc1 = hasFillColor
      ? (Array.isArray(fillColor) ? fillColor![0] : fillColor!)
      : 'transparent';
    const fc2 = hasFillColor
      ? (Array.isArray(fillColor) ? (fillColor![1] ?? fillColor![0]) : fillColor!)
      : 'transparent';
    const filled = hasFillColor
      ? (Array.isArray(fillColor) ? fillColor![0] : fillColor!)
      : 'currentColor';

    return {
      strokeWidth,
      strokeColor1: Array.isArray(strokeColor) ? strokeColor[0] : strokeColor,
      strokeColor2: Array.isArray(strokeColor) ? (strokeColor[1] ?? strokeColor[0]) : strokeColor,
      fillColor1: fc1,
      fillColor2: fc2,
      filledColor: filled,
    };
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
