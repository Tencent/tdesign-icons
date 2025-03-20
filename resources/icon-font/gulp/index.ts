import path from 'path';
import fs from 'fs';
import { series } from 'gulp';
import SVGFixer from 'oslllo-svg-fixer';
import { generateIconFont, generateIconFontJson } from '../../../gulp/generate-icon-font';
import { clearDir } from '../../../gulp/clean-dir';

const targetDir = path.resolve(__dirname, '../dist/');
const fontCssConfig = {
  fontName: 't',
  path: path.resolve(__dirname, './template/index.css'),
  targetPath: '../dist/index.css',
  fontPath: './',
};

const source = path.resolve(__dirname, '../../../svg');
const destination = path.resolve(__dirname, '../../../svg_converted');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true }); // recursive: true 确保父目录存在时自动创建
}

const getSvgFixer = async () => {
  await SVGFixer(source, destination, { showProgressBar: true }).fix();
};

export function iconFontTask(source: string[]) {
  console.log('source:', source);
  return series(
    clearDir(['resources/icon-font/dist']),
    // getSvgFixer,
    // to generate eot/svg/ttf/woff/css
    generateIconFont({
      iconGlob: 'svg_converted/*.svg',
      targetDir,
      fontCssConfig,
    }),
    // to generate .json
    generateIconFontJson({
      iconGlob: 'svg_converted/*.svg',
      targetDir,
    }),
  );
}
