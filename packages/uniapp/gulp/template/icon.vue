<template>
  <view class="t-icon-root" :class="_classNames" :style="_rootStyle" @click="onClick">
    <image class="t-icon-image" :src="_src" mode="aspectFit" style="width: 100%; height: 100%; display: block;" />
  </view>
</template>

<script>
/**
 * 图标模板：由 `pnpm run generate` 生成，请勿手动修改。
 * 颜色占位符 {f1}/{f2}/{s1}/{s2} 与描边宽度占位符 {sw} 在运行时由 icon-runtime 解析。
 *
 * 传统 uni-app 只支持 .vue / .nvue，这里使用 Vue 2 / Vue 3 都支持的选项式写法。
 */
import { resolveSvg, resolveSizeStyle, toSvgDataUri, SIZE_CLASS_NAMES } from '../../utils/icon-runtime';

const TEMPLATE = `$TEMPLATE`;

export default {
  name: '$ICON_NAME',
  /** 原始占位符模板：供按需渲染的场景直接取用（例如小程序端不支持动态组件时） */
  TEMPLATE,
  data() {
    return {
      /**
       * 每个实例的唯一后缀，用于隔离 <mask> 的 id。
       *
       * 模板里的 mask id 是固定名（fill1-overlap 等），同一页面同时渲染多个图标时
       * id 会重复，导致带填充色的图标互相串味或整块空白。
       * web 端给 id 拼了实例前缀（props.overlapMaskId_fill1），这里等价处理。
       */
      uid: `u${Math.ceil(Math.random() * 10e8).toString(36)}`,
    };
  },
  props: {
    /** 图标尺寸，支持 'small' | 'medium' | 'large' | '20px' | '1.5em' */
    size: {
      type: String,
      default: '',
    },
    /** 描边颜色，支持 string 或 string[]，多色图标按顺序取用 */
    strokeColor: {
      type: [String, Array],
      default: null,
    },
    /** 填充颜色，支持 string 或 string[]，多色图标按顺序取用 */
    fillColor: {
      type: [String, Array],
      default: null,
    },
    /** 描边宽度 */
    strokeWidth: {
      type: Number,
      default: 2,
    },
    /** 点击事件 */
    onClick: {
      type: Function,
      default: null,
    },
  },
  computed: {
    _src() {
      return toSvgDataUri(resolveSvg(TEMPLATE, this.strokeColor, this.fillColor, this.strokeWidth, this.uid));
    },
    _classNames() {
      const sizeClass = SIZE_CLASS_NAMES[this.size];
      // class 名用 t-icon-<name>，与 web 端保持一致
      return sizeClass ? `t-icon t-icon-$KEY ${sizeClass}` : `t-icon t-icon-$KEY`;
    },
    _rootStyle() {
      const sizeStyle = resolveSizeStyle(this.size);
      // 预设尺寸交给 class（t-size-s/m/l）控制，这里不能写 width/height，否则会覆盖 class；
      // 自定义尺寸或无尺寸时则显式给宽高（无尺寸回落到 1em），
      // 否则 <image> 的 100% 尺寸会失去参照而塌缩为 0
      if (!sizeStyle.width) {
        return SIZE_CLASS_NAMES[this.size]
          ? 'display:inline-block;vertical-align:middle;'
          : 'display:inline-block;vertical-align:middle;width:1em;height:1em;';
      }
      return `display:inline-block;vertical-align:middle;width:${sizeStyle.width};height:${sizeStyle.height};`;
    },
  },
};
</script>

<style>
@import '../../style/index.css';
</style>
