import { parallel, series } from 'gulp';

import { reactTask } from './packages/react/gulp';

import { svgSpriteTask } from './packages/svg-sprite/gulp';
import { iconFontTask } from './packages/icon-font/gulp';
import { iconViewTask } from './packages/view/gulp';

const source: string[] = ['svg/*.svg'];

export default series(
  parallel(
    reactTask(source),
    svgSpriteTask(),
    iconFontTask(source),
    iconViewTask(source),
  ),
);
