import path from 'path';
import { series } from 'gulp';
import { generateSprite, generateSvgSpriteJS } from '../../../gulp/generate-sprite';
import { clearDir } from '../../../gulp/clean-dir';

const templateFrom = path.resolve(__dirname, './template/index.js');
const iconGlob = path.resolve(__dirname, '../../../svg/*.svg');
const iconDir = path.resolve(__dirname, '../../../svg');
const targetDir = path.resolve(__dirname, '../dist/');
const config = {
  shape: {
    dimension: {
      // Set maximum dimensions
      maxWidth: 32,
      maxHeight: 32,
    },
    spacing: {
      // Add padding
      padding: 10,
    },
  },
  mode: {
    css: {
      bust: false,
      render: {
        css: true,
      },
    },
  },
};

export function svgSpriteTask() {
  return series(
    clearDir(['packages/svgSprite/dist']),
    generateSprite({ iconGlob, iconDir, config, targetDir }),
    generateSvgSpriteJS({ from: templateFrom, to: targetDir }),
  );
}
