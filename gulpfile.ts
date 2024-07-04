import { parallel, series } from 'gulp';

import { reactTask } from './packages/react/gulp';
import { angularTask } from './packages/angular/gulp';
import { svgTask } from './packages/svg/gulp';
import { vueTask } from './packages/vue/gulp';
import { vueNextTask } from './packages/vue-next/gulp';
import { reactNativeTask } from './packages/react-native/gulp';

import { svgSpriteTask } from './resources/svg-sprite/gulp';
import { iconFontTask } from './resources/icon-font/gulp';

import { iconViewTask } from './packages/view/gulp';
import { wcTask } from './packages/web-components/gulp';

const source: string[] = ['svg/*.svg'];

export default series(
  parallel(
    reactTask(source),
    vueTask(source),
    vueNextTask(source),
    svgTask(source),
    angularTask(source),
    reactNativeTask(),
    svgSpriteTask(),
    iconFontTask(source),
    iconViewTask(),
    wcTask(source),
  ),
);
