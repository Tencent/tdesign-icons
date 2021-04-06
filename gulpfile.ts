import { parallel, series } from 'gulp';
import { angularTask } from './packages/angular/gulp';

import { reactTask } from './packages/react/gulp';
import { svgTask } from './packages/svg/gulp';
import { vueTask } from './packages/vue/gulp';

const source: string[] = ['svg/*.svg'];

export default series(parallel(reactTask(source), vueTask(source), svgTask(source), angularTask(source)));
