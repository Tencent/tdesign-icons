import path from 'path';
import fs from 'fs';

import { upperCamelCase, renderNode } from '../../../gulp/util';

const template = fs.readFileSync(path.resolve(__dirname, 'template/icon.component.ts'), 'utf-8');

export function angularGetIconFileContent({ name, element }: { name: string; element: string }): string {
  const svg = renderNode(JSON.parse(element)).replace(/<svg/, '<svg [ngClass]="_classes" [ngStyle]="_styles"');
  return template
    .replace(/\$ICON_NAME/g, upperCamelCase(name))
    .replace(/\$SVG/g, svg)
    .replace(/\$KEY/g, name)
    .replace(/view-box/g, 'viewBox');
}
