import path from 'path';
import fs from 'fs';

import { upperCamelCase } from '../../../gulp/util';

const template = fs.readFileSync(path.resolve(__dirname, 'template/icon.vue'), 'utf-8');

/**
 * 把占位符 SVG 模板包装成 .vue 组件（传统 uni-app，Vue 2 / Vue 3 通用）
 */
export function uniAppGetIconFileContent({ name, element }: { name: string; element: string }): string {
  // 模板里用反引号包裹 svg 字符串，需要转义可能出现的反引号与模板插值
  const templateLiteral = element.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

  return template
    .replace(/\$TEMPLATE/g, () => templateLiteral)
    .replace(/\$ICON_NAME/g, () => `${upperCamelCase(name)}Icon`)
    .replace(/\$KEY/g, () => name);
}
