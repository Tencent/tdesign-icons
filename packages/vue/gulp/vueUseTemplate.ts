import path from 'path';
import fs from 'fs';

import { upperCamelCase } from '../../../gulp/util';

const template = fs.readFileSync(path.resolve(__dirname, 'template/icon.vue'), 'utf-8');

export function vueGetIconFileContent({ name, element }: { name: string; element: string }): string {
  return template
    .replace(/\$ICON_NAME/g, upperCamelCase(name))
    .replace(/\$ELEMENT/g, element)
    .replace(/\$KEY/g, name);
}
