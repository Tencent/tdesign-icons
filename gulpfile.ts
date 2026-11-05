import { parallel, series } from 'gulp';

import { reactTask } from './packages/react/gulp';
import { svgTask } from './packages/svg/gulp';
import { vueTask } from './packages/vue/gulp';
import { vueNextTask } from './packages/vue-next/gulp';
// import { reactNativeTask } from './packages/react-native/gulp';

import { svgSpriteTask } from './resources/svg-sprite/gulp';
import { iconFontTask } from './resources/icon-font/gulp';

import { iconViewTask } from './packages/view/gulp';
import { wcTask } from './packages/web-components/gulp';
import { uniAppTask } from './packages/uniapp/gulp';
import { uniAppXTask } from './packages/uniapp-x/gulp';

const source: string[] = ['svg/*.svg'];

export default series(
  parallel(
    reactTask(source),
    vueTask(source),
    vueNextTask(source),
    svgTask(source),
    // reactNativeTask(),
    svgSpriteTask(),
    iconFontTask(),
    iconViewTask(),
    wcTask(source),
    uniAppTask(source),
    uniAppXTask(source),
  ),
);
