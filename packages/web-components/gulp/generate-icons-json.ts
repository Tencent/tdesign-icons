import { src } from 'gulp';

import path from 'path';
import fs from 'fs';
import { svgToElement, SvgToElementOptions } from '../../../gulp/svg-info-check';
import { svgo, SVGOConfig } from '../../../gulp/svgo';
import { useTemplate } from '../../../gulp/use-template';
import vnodeConvert from './vnode-convert';

const iconGlob = path.resolve(__dirname, '../../../svg/*.svg');
const iconDir = path.resolve(__dirname, '../../../svg');
const targetDir = path.resolve(__dirname, '../src/svg-sprite/');

interface GenerateIconOptions {
  options?: SvgToElementOptions;
  config?: SVGOConfig;
}

const template = fs.readFileSync(path.resolve(__dirname, 'template/iconJson.ts'), 'utf-8');

const iconsJson:Record<string, string> = {};

export const generateIconsJson = ({
  config, options,
}: GenerateIconOptions) => function generateIcons() {
  return src(iconGlob, { cwd: iconDir })
    .pipe(svgo(config))
    .pipe(svgToElement(options))
    .pipe(useTemplate(({ name, element }: { name: string; element: string }) => {
      const ele = JSON.stringify(vnodeConvert(JSON.parse(element)));
      iconsJson[name] = ele;
      return JSON.stringify(iconsJson);
    }))
    .on('end', () => {
      const iconJson = template.replace(/\$SVGJSON/g, JSON.stringify(iconsJson, undefined, 2));
      fs.writeFileSync(path.resolve(targetDir, 'svg-icon.ts'), iconJson);
    });
};
