/**
 * 示例共用的演示数据（分类、配色、尺寸）
 *
 * 本文件与 index.uvue 走同一套编译流程，沿用页面里的 uts 约束：
 * 比较只用 `==` / `!=`，导出的常量、函数参数与返回值都显式标注类型，
 * 对象一律用具名 type（uts 是名义类型，结构相同的不同 type 不能互相赋值）。
 */
/* eslint-disable eqeqeq -- uts 编译到 iOS（Swift）时 `===` / `!==` 不能比较字符串，与 index.uvue 的写法保持一致 */

/** 「key + 文案」形式的选项：描边类型、颜色模式、色位共用 */
export type LabelOption = {
  key: string
  label: string
}

/** 各描边类型下可用的颜色模式 */
export type ColorTypeMap = {
  outline: LabelOption[]
  outlineFilled: LabelOption[]
}

/** 4 个颜色位的取值 */
export type ColorPreset = {
  strokeColor1: string
  strokeColor2: string
  fillColor1: string
  fillColor2: string
}

/** 传给图标组件的 strokeColor / fillColor */
export type IconColors = {
  strokeColor: string[]
  fillColor: string[]
}

/**
 * 预览用的配色，对应图标模板里的 4 个颜色位：
 *   {f1} / {f2} 填充第 1 / 第 2 位，{s1} / {s2} 描边第 1 / 第 2 位。
 * 与 packages/view/src/icon-view.vue 的 fillColor1/2、strokeColor1/2 一一对应。
 */
export const COLOR_PRESET: ColorPreset = {
  strokeColor1: '#0052D9',
  strokeColor2: '#E37318',
  fillColor1: '#FFB703',
  fillColor2: '#F78D94',
};

/** 描边类型，与 view 的 strokeTypes 一致：描边 / 描边-填充 */
export const STROKE_TYPES: LabelOption[] = [
  { key: 'outline', label: '描边' },
  { key: 'outlineFilled', label: '描边-填充' },
];

/** 可用的颜色模式随描边类型变化，与 view 的 colorType 单选按钮一致 */
export const COLOR_TYPES: ColorTypeMap = {
  outline: [
    { key: 'single', label: '单色' },
    { key: 'double', label: '双色' },
  ],
  outlineFilled: [
    { key: 'double', label: '双色' },
    { key: 'multiple', label: '多色' },
  ],
};

/** 当前描边类型下可用的颜色模式列表。uts 不支持用变量做 key 索引对象，这里显式分支 */
export function getColorTypes(strokeTypes: string): LabelOption[] {
  return strokeTypes == 'outline' ? COLOR_TYPES.outline : COLOR_TYPES.outlineFilled;
}

export const SIZE_OPTIONS: string[] = ['small', 'medium', 'large', '24px', '32px', '48px'];

/** 「全部图标」标签页可选的图标颜色 */
export const COLOR_OPTIONS: string[] = ['#333333', '#0052D9', '#E37318', '#07C160', '#E34D59'];

/**
 * 「多色 / 可变」标签页里 4 个色位共用的调色板。
 * 小程序端没有 color-picker 组件，用预设色块点击切换，效果等价于 view 里的 t-color-picker。
 */
export const COLOR_PALETTE: string[] = [
  '#333333', '#0052D9', '#E37318', '#FFB703',
  '#F78D94', '#07C160', '#E34D59', '#8E56DD',
];

/** 4 个颜色位，对应图标模板的 {f1}/{f2}/{s1}/{s2} */
export const COLOR_SLOTS: LabelOption[] = [
  { key: 'fillColor1', label: '填充 1 · f1' },
  { key: 'fillColor2', label: '填充 2 · f2' },
  { key: 'strokeColor1', label: '描边 1 · s1' },
  { key: 'strokeColor2', label: '描边 2 · s2' },
];

/**
 * 该模式下真正生效、需要给用户编辑的色位，与 view 里颜色选择器的显示规则一致：
 *   outline + single        -> 只描边 1 个色位
 *   outline + double        -> 描边 1 / 描边 2 两个独立色位，填充透明
 *   outlineFilled + double  -> 填充 1 / 描边 1，第 2 色位跟随第 1 色位
 *   outlineFilled + multiple -> 4 个色位全部独立
 */
export function editableSlots(colorType: string, strokeTypes: string): string[] {
  if (colorType == 'single') return ['strokeColor1'];
  if (colorType == 'double') {
    // view：描边模式下双色是两个独立的描边色位；描边-填充下第 2 色位跟随第 1 色位
    return strokeTypes == 'outline' ? ['strokeColor1', 'strokeColor2'] : ['fillColor1', 'strokeColor1'];
  }
  return COLOR_SLOTS.map((slot) => slot.key);
}

/**
 * 「多色 / 可变」标签页只演示这几个带多色位的图标。
 * 具体图标组件是编译期静态标签（easycom 自动注册），小程序端不支持动态组件，
 * 因此名单与模板里的标签一一对应，这里只用于标题计数与说明。
 */
export const MULTICOLOR_ICONS: string[] = [
  'ability-open',
  'abstract',
  'accessibility',
  'system-components',
  'chart-pie',
  // logo-tdesign 只有 {f1} 填充位、没有描边位，切到「描边」模式会整体透明，故用带 4 色位的图标代替
  'certificate',
  'app',
  'camera',
  'chart-ring-1',
  'building',
  'brightness',
  'cake',
];

/**
 * 按展示模式计算 strokeColor / fillColor，与 packages/view 的 icon-view.vue 对齐。
 *
 * 图标模板有 4 个颜色位：填充 {f1}/{f2}、描边 {s1}/{s2}。
 * 传单值时所有色位共用该色；传数组时按顺序对应第 1 / 第 2 色位，主色在前，不能颠倒。
 * 先按 strokeTypes 区分描边类型，再按 colorType 决定色位：
 *   outline + single        只描边，第 2 描边色位跟随第 1 位，填充透明
 *   outline + double        两个独立描边色，填充透明
 *   outlineFilled + double  填充 / 描边的第 2 色位跟随第 1 色位
 *   outlineFilled + multiple 4 个色位各自独立
 *
 * 注：约 6 成图标只有 {f1}/{s1} 单色位，第 2 色位对它们不存在，
 * 因此需要第 2 色位的模式在这类图标上只体现第 1 色位——这是图标自身色位决定的，
 * 不是配色逻辑问题。view 里同样是按图标风格（outline / outlineFilled）绑定可用的颜色模式。
 */
export function resolveColors(
  colorType: string,
  strokeTypes: string,
  preset: ColorPreset = COLOR_PRESET,
): IconColors {
  // 单色：只描边，填充透明，第 2 描边色位跟随第 1 位
  if (colorType == 'single') {
    return {
      strokeColor: [preset.strokeColor1, preset.strokeColor1],
      fillColor: ['transparent', 'transparent'],
    };
  }
  // 描边 + 双色：两个独立的描边色，填充透明（view 的 outline / double）
  if (colorType == 'double' && strokeTypes == 'outline') {
    return {
      strokeColor: [preset.strokeColor1, preset.strokeColor2],
      fillColor: ['transparent', 'transparent'],
    };
  }
  // 描边-填充 + 双色：填充 / 描边的第 2 色位都跟随第 1 色位（view 的 outlineFilled / double）
  if (colorType == 'double') {
    return {
      strokeColor: [preset.strokeColor1, preset.strokeColor1],
      fillColor: [preset.fillColor1, preset.fillColor1],
    };
  }
  // 多色：4 个色位各自独立（view 的 outlineFilled / multiple）
  return {
    strokeColor: [preset.strokeColor1, preset.strokeColor2],
    fillColor: [preset.fillColor1, preset.fillColor2],
  };
}
