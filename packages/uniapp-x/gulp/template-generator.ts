import path from 'path';
import fs from 'fs';

import { upperCamelCase } from '../../../gulp/util';

const template = fs.readFileSync(path.resolve(__dirname, 'template/icon.uvue'), 'utf-8');

/**
 * 把占位符 SVG 模板包装成 .uvue 组件（uni-app x）
 */
export function uniAppXGetIconFileContent({ name, element }: { name: string; element: string }): string {
  // 模板里用反引号包裹 svg 字符串，需要转义可能出现的反引号与模板插值
  const templateLiteral = element.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

  return template
    .replace(/\$TEMPLATE/g, () => templateLiteral)
    .replace(/\$ICON_NAME/g, () => `${upperCamelCase(name)}Icon`)
    .replace(/\$KEY/g, () => name);
}
