import path from 'path';
import fs from 'fs';

import { upperCamelCase } from '../../../gulp/util';
import vnodeConvert from './vnode-convert';

const template = fs.readFileSync(path.resolve(__dirname, 'template/icon.tsx'), 'utf-8');

export function wcGetIconFileContent({ name, element }: { name: string; element: string }): string {
  const ele = JSON.stringify(vnodeConvert(JSON.parse(element)));

  return template
    .replace(/\$ICON_TAG_NAME/g, `t-icon-${name.toLocaleLowerCase()}`)
    .replace(/\$ICON_NAME/g, `${upperCamelCase(name)}Icon`)
    .replace(/\$ELEMENT/g, ele)
    .replace(/\$KEY/g, name);
}
