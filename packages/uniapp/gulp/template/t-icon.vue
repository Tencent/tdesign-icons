<template>
  <text class="t-icon" :class="_classNames" :style="_rootStyle" @click="handleClick">{{ _unicode }}</text>
</template>

<script>
/**
 * t-icon：单组件按名称渲染任意内置图标（单色）。
 *
 * 本文件是模板：由 `pnpm run generate` 原样输出到 components/t-icon/t-icon.vue，请勿手动使用。
 * easycom 只扫描 components/<name>/<name>.vue，所以它必须生成到那里才能被自动注册。
 *
 * 与 tdesign-miniprogram 的 uniapp icon、uni-icons 一样走「字体图标」：
 * 一套 CDN 字体 + 码点映射，用 <text> 直接输出 unicode 字符，
 * 颜色 / 尺寸只是 color / font-size，由 CSS 控制。
 *
 * 相比「每个图标解码一张 SVG data URI 的 <image>」：
 *   - 一套字体只加载一次，没有逐张图片解码；
 *   - 切换颜色 / 尺寸不重算 src、不触发图片重载，全量列表也不卡；
 *   - setData 里只是一个字符，而不是几百字节的 data URI。
 *
 * 字体由 @font-face 从 CDN 加载，不进小程序包；小程序端需把
 * https://tdesign.gtimg.com 配到 downloadFile 合法域名（开发者工具可关闭域名校验）。
 *
 * 需要多色 / 可变描边宽度请用具体图标组件（<app-icon :stroke-color="..." />）。
 *
 * 点击以 click 事件抛出，写法与具体图标组件一致：声明 emits 后 Vue 3 不会再把父级监听器
 * 透传到根节点（不会触发两次），Vue 2 与小程序端则依赖 $emit（小程序端父级的 @click 被编译成自定义事件）。
 */
import { ICON_UNICODE } from '../../utils/icon-unicode';

/** small/medium/large 与 style/index.css 里的预设尺寸保持一致 */
const SIZE_PX = { small: '14px', medium: '16px', large: '18px' };

export default {
  name: 'TIcon',
  emits: ['click'],
  props: {
    /** 图标名，即 icon-unicode.js 里的 key */
    name: {
      type: String,
      default: '',
    },
    /** 图标尺寸，支持 small / medium / large / '20px' / '1.5em' */
    size: {
      type: String,
      default: '',
    },
    /** 单色图标颜色 */
    color: {
      type: String,
      default: '#333333',
    },
  },
  computed: {
    _unicode() {
      return ICON_UNICODE[this.name] || '';
    },
    _classNames() {
      return `t-icon-${this.name}`;
    },
    _rootStyle() {
      const fontSize = SIZE_PX[this.size] || this.size || '1em';
      return `color:${this.color || '#333333'};font-size:${fontSize};line-height:1;`;
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
  },
};
</script>

<style>
@import '../../style/iconfont.css';
</style>
