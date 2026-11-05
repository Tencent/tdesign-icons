/**
 * 示例共用的演示数据（分类、配色、尺寸）
 */

/** 预览用的配色 */
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

/** 按展示模式计算 strokeColor / fillColor */
export function resolveColors(colorType) {
  if (colorType === 'single') {
    return {
      strokeColor: [COLOR_PRESET.strokeColor1],
      fillColor: [COLOR_PRESET.fillColor1],
    };
  }
  if (colorType === 'double') {
    return {
      strokeColor: [COLOR_PRESET.strokeColor1],
      fillColor: [COLOR_PRESET.fillColor1, COLOR_PRESET.fillColor2],
    };
  }
  return {
    strokeColor: [COLOR_PRESET.strokeColor1, COLOR_PRESET.strokeColor2],
    fillColor: [COLOR_PRESET.fillColor1, COLOR_PRESET.fillColor2],
  };
}
