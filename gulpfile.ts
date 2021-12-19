import { parallel, series } from 'gulp';

import { reactTask } from './packages/react/gulp';
import { angularTask } from './packages/angular/gulp';
import { svgTask } from './packages/svg/gulp';
import { vueTask } from './packages/vue/gulp';
import { vueNextTask } from './packages/vue-next/gulp';

import { svgSpriteTask } from './packages/svg-sprite/gulp';
import { iconFontTask } from './packages/icon-font/gulp';

import { iconViewTask } from './packages/view/gulp';

const source: string[] = ['svg/*.svg'];

export default series(
  parallel(
    reactTask(source),
    vueTask(source),
    vueNextTask(source),
    svgTask(source),
    angularTask(source),
    svgSpriteTask(),
    iconFontTask(source),
    iconViewTask(source),
  ),
);
