import { dest, src } from 'gulp';
import concat from 'gulp-concat';

import { svgToElement } from '../../../gulp/svg-info-check';
import { svgo } from '../../../gulp/svgo';
import { svgElementJsonToTemplate } from '../../../gulp/svg-to-template';
import { createTransformStream } from '../../../gulp/transform';

/** 与单图标组件完全一致的解析参数，保证两条渲染路径产出的 SVG 相同 */
const SVG_OPTIONS = { replaceColor: true, propsString: true };

const AUTO_GENERATED = '/* 由 pnpm run generate 生成，请勿手动修改 */\n';

/** createTransformStream 的 file 形参被标注为 DOM File，运行时实际是 Vinyl */
const stemOf = (file: File): string => (file as unknown as { stem: string }).stem;

/**
 * 生成 t-icon 使用的全量图标表。
 *
 * 每个值是一段带占位符的 SVG 字符串（{f1}/{s1}/{sw} 等），
 * 与 components/<name>-icon 组件里的 TEMPLATE 同源，运行时由 icon-runtime 解析。
 */
export const generateIconMap = ({ from, to }: { from: string[]; to: string }) => function generateIconMap() {
  const itemTemplate = createTransformStream((elementJson, file) => {
    const name = stemOf(file);
    return `  ${JSON.stringify(name)}: ${JSON.stringify(svgElementJsonToTemplate(elementJson, name))},\n`;
  });

  return src(from)
    .pipe(svgo())
    .pipe(svgToElement(SVG_OPTIONS))
    .pipe(itemTemplate)
    .pipe(concat('NOT-VALID'))
    .pipe(createTransformStream((content) => `${AUTO_GENERATED}export const ICON_MAP = {\n${content}};\n\nexport const ICON_NAMES = Object.keys(ICON_MAP);\n`))
    .pipe(concat('icon-map.js'))
    .pipe(dest(to));
};
