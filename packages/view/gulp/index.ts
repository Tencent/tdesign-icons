import { series } from 'gulp';

import { generateViewSvgSprite } from './generate-view-svg-sprite';

export function iconViewTask() {
  return series(
    generateViewSvgSprite('packages/view/src'),
  );
}
