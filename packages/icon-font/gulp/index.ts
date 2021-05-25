import path from 'path';
import { series } from 'gulp';
import { generateIconFont, generateIconFontJson } from '../../../gulp/generate-icon-font';
import { clearDir } from '../../../gulp/clean-dir';
const targetDir = path.resolve(__dirname, '../dist/');
const fontCssConfig = {
  fontName: 't',
  path: path.resolve(__dirname, './template/index.css'),
  targetPath: '../dist/index.css',
  fontPath: './',
};

export function iconFontTask(source: string[]) {
  return series(
    clearDir(['packages/iconFont/dist']),
    generateIconFont({
      iconGlob: source[0],
      targetDir,
      fontCssConfig,
    }),
    generateIconFontJson({
      iconGlob: source[0],
      targetDir,
    }),
  );
}
