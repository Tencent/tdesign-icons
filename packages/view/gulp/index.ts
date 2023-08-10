import { series } from 'gulp';
import { clearDir } from '../../../gulp/clean-dir';

import { generateViewSvgSprite } from './generate-view-svg-sprite';

export function iconViewTask() {
  return series(
    clearDir(['packages/view/gulp/template']),
    generateViewSvgSprite(),
  );
}
