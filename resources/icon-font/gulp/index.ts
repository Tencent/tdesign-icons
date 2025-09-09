import path from 'path';
import { series } from 'gulp';
import { generateIconFont, generateIconFontJson } from '../../../gulp/generate-icon-font';
import { clearDir } from '../../../gulp/clean-dir';

const sourceDir = 'converted_svg/*.svg';
const targetDir = path.resolve(__dirname, '../dist/');
const fontCssConfig = {
  fontName: 't',
  path: path.resolve(__dirname, './template/index.css'),
  targetPath: '../dist/index.css',
  fontPath: './',
};

export function iconFontTask() {
  return series(
    clearDir(['resources/icon-font/dist']),

    // to generate eot/svg/ttf/woff/css
    generateIconFont({
      iconGlob: sourceDir,
      targetDir,
      fontCssConfig,
    }),
    // to generate .json
    generateIconFontJson({
      iconGlob: sourceDir,
      targetDir,
    }),
  );
}
