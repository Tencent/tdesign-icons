/**
 * 示例共用的演示数据（分类、配色、尺寸）
 */

/**
 * 预览用的配色，对应图标模板里的 4 个颜色位：
 *   {f1} / {f2} 填充第 1 / 第 2 位，{s1} / {s2} 描边第 1 / 第 2 位。
 * 与 packages/view/src/icon-view.vue 的 fillColor1/2、strokeColor1/2 一一对应。
 */
export const COLOR_PRESET = {
  strokeColor1: '#0052D9',
  strokeColor2: '#E37318',
  fillColor1: '#FFB703',
  fillColor2: '#F78D94',
};

export const COLOR_TYPES = [
  { key: 'single', label: '单色' },
  { key: 'double', label: '双色' },
  { key: 'multiple', label: '多色' },
];

export const SIZE_OPTIONS = ['small', 'medium', 'large', '24px', '32px', '48px'];

/** 「全部图标」标签页可选的图标颜色 */
export const COLOR_OPTIONS = ['#333333', '#0052D9', '#E37318', '#07C160', '#E34D59'];

/**
 * 「多色 / 可变」标签页里 4 个色位共用的调色板。
 * 小程序端没有 color-picker 组件，用预设色块点击切换，效果等价于 view 里的 t-color-picker。
 */
export const COLOR_PALETTE = [
  '#333333', '#0052D9', '#E37318', '#FFB703',
  '#F78D94', '#07C160', '#E34D59', '#8E56DD',
];

/** 4 个颜色位，对应图标模板的 {f1}/{f2}/{s1}/{s2} */
export const COLOR_SLOTS = [
  { key: 'fillColor1', label: '填充 1 · f1' },
  { key: 'fillColor2', label: '填充 2 · f2' },
  { key: 'strokeColor1', label: '描边 1 · s1' },
  { key: 'strokeColor2', label: '描边 2 · s2' },
];

/**
 * 该模式下真正生效、需要给用户编辑的色位，与 view 里颜色选择器的显示规则一致：
 *   single   -> 只描边 1 个色位
 *   double   -> 填充 / 描边各 1 个色位（第 2 色位跟随第 1 色位）
 *   multiple -> 4 个色位全部独立
 */
export function editableSlots(colorType) {
  if (colorType === 'single') return ['strokeColor1'];
  if (colorType === 'double') return ['fillColor1', 'strokeColor1'];
  return COLOR_SLOTS.map((slot) => slot.key);
}

/**
 * 「多色 / 可变」标签页只演示这几个带多色位的图标。
 * 具体图标组件是编译期静态标签（easycom 自动注册），小程序端不支持动态组件，
 * 因此名单与模板里的标签一一对应，这里只用于标题计数与说明。
 */
export const MULTICOLOR_ICONS = [
  'ability-open',
  'abstract',
  'accessibility',
  'system-components',
  'chart-pie',
  'logo-tdesign',
];

/**
 * 按展示模式计算 strokeColor / fillColor，与 packages/view 的 icon-view.vue 对齐。
 *
 * 图标模板有 4 个颜色位：填充 {f1}/{f2}、描边 {s1}/{s2}。
 * 传单值时所有色位共用该色；传数组时按顺序对应第 1 / 第 2 色位，主色在前，不能颠倒。
 *   single   单值、填充透明（只描边）        —— 1 色
 *   double   长度 2，第 2 色位跟随第 1 色位  —— 填充 / 描边各 1 色，共 2 色
 *   multiple 长度 2，4 个色位各自独立        —— 最多 4 色
 *
 * 注：约 6 成图标只有 {f1}/{s1} 单色位，第 2 色位对它们不存在，
 * 因此 double 与 multiple 在这类图标上只体现第 1 色位——这是图标自身色位决定的，
 * 不是配色逻辑问题。view 里同样是按图标风格（outline / outlineFilled）绑定可用的颜色模式。
 */
export function resolveColors(colorType, preset = COLOR_PRESET) {
  if (colorType === 'single') {
    return {
      strokeColor: [preset.strokeColor1],
      fillColor: ['transparent'],
    };
  }
  if (colorType === 'double') {
    return {
      strokeColor: [preset.strokeColor1, preset.strokeColor1],
      fillColor: [preset.fillColor1, preset.fillColor1],
    };
  }
  return {
    strokeColor: [preset.strokeColor1, preset.strokeColor2],
    fillColor: [preset.fillColor1, preset.fillColor2],
  };
}
