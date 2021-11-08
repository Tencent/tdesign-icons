import path from 'path';
import { series } from 'gulp';
import { generateSprite, generateSvgSpriteJS } from '../../../gulp/generate-sprite';
import { clearDir } from '../../../gulp/clean-dir';

const templateFrom = path.resolve(__dirname, './template/index.js');
const iconGlob = path.resolve(__dirname, '../../../svg/*.svg');
const iconDir = path.resolve(__dirname, '../../../svg');
const targetDir = path.resolve(__dirname, '../dist/');
const config = {
  svg: {
    rootAttributes: {
      style: 'position:absolute; width:0; height:0; visibility:hidden',
    },
  },
  shape: {
    id: {
      generator(name: string) {
        return `t-icon-${name.replace('.svg', '')}`;
      },
    },
    dimension: {
      // Set maximum dimensions
      maxWidth: 16,
      maxHeight: 16,
    },
  },
  mode: {
    symbol: true,
  },
};

export function svgSpriteTask() {
  return series(
    clearDir(['packages/svg-sprite/dist']),
    generateSprite({
      iconGlob, iconDir, config, targetDir,
    }),
    generateSvgSpriteJS({ from: templateFrom, to: targetDir }),
  );
}
