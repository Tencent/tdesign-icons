import { parallel, series } from 'gulp';
import { angularTask } from './packages/angular/gulp';

import { reactTask } from './packages/react/gulp';
import { svgTask } from './packages/svg/gulp';
import { vueTask } from './packages/vue/gulp';
import { svgSpriteTask } from './packages/svgSprite/gulp';
import { iconFontTask } from './packages/iconFont/gulp';
import { generateSprite } from './gulp/generateSprite';
import { generateIconFont } from './gulp/generateIconFont';
import { clearDir } from './gulp/cleanDir';

const source: string[] = ['svg/*.svg'];

export default series(
  parallel(
    reactTask(source),
    vueTask(source),
    svgTask(source),
    angularTask(source),
    svgSpriteTask(generateSprite, clearDir),
    iconFontTask(generateIconFont, clearDir)
  ),
);
