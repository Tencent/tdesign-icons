<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { getSizeStyle, getSizeClassName } from '../util/size.js';
  import { loadLink, loadStylesheet } from '../util/check-url-and-load.js';

  interface IconFontProps extends HTMLAttributes<HTMLElement> {
    /** 图标类型 */
    name?: string;
    /** 尺寸 */
    size?: 'small' | 'medium' | 'large' | string | number;
    /** 渲染容器元素 @default 'i' */
    tag?: 'i' | 'span' | 'div';
    /** 样式 */
    style?: string;
    /** 类名 */
    class?: string;
    /** 图标地址 */
    url?: string | string[];
    /** @default true */
    loadDefaultIcons?: boolean;
  }

  const CDN_ICONFONT_URL = 'https://tdesign.gtimg.com/icon/0.4.1/fonts/index.css';
  const classPrefix = 't';

  let {
    name = '',
    size = undefined,
    tag = 'i',
    class: customClassName = '',
    url = undefined,
    loadDefaultIcons = true,
    style: customStyle = '',
    ...htmlProps
  }: IconFontProps = $props();

  const sizeClassName = $derived(getSizeClassName(size));
  const sizeStyle = $derived(getSizeStyle(size));

  const isBuiltInIcon = $derived(url && /^t-icon-(\w|-)+$/.test(name));

  const iconClass = $derived.by(() => {
    const classes: string[] = [];
    if (url) classes.push(name);
    if (!url || isBuiltInIcon) classes.push(`${classPrefix}-icon`);
    if (!url) classes.push(`${classPrefix}-icon-${name}`);
    if (sizeClassName) classes.push(sizeClassName);
    if (customClassName) classes.push(customClassName);
    return classes.join(' ');
  });

  const mergedStyle = $derived(
    [customStyle, sizeStyle].filter(Boolean).join('; ')
  );

  $effect(() => {
    loadStylesheet();
  });

  $effect(() => {
    if (loadDefaultIcons) {
      loadLink(CDN_ICONFONT_URL, `${classPrefix}-iconfont-stylesheet--unique-class`);
    }
  });

  $effect(() => {
    if (url) {
      const urls = Array.isArray(url) ? url : [url];
      urls.forEach((u) => {
        loadLink(u, `${classPrefix}-iconfont-stylesheet--unique-class`);
      });
    }
  });
</script>

{#if tag === 'i'}
  <i class={iconClass} style={mergedStyle} {...htmlProps}></i>
{:else if tag === 'span'}
  <span class={iconClass} style={mergedStyle} {...htmlProps}></span>
{:else}
  <div class={iconClass} style={mergedStyle} {...htmlProps}></div>
{/if}
