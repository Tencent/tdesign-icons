import { parallel, series } from 'gulp';

import { generateEntry } from '../../../gulp/generateEntry';
import { generateManifest } from '../../../gulp/generateManifest';
import { generateIcons } from '../../../gulp/generateIcons';
import { clearDir } from '../../../gulp/cleanDir';

import { vueGetIconFileContent } from './vueUseTemplate';

export function vueTask(source: string[]) {
  return series(
    clearDir(['packages/vue/dist', 'packages/vue/src/components']),

    parallel(
      generateIcons({
        from: [...source],
        to: 'packages/vue/src/components',
        iconGenerator: vueGetIconFileContent,
        extName: '.vue',
        options: {
          replaceColor: true,
        },
      }),

      generateManifest({
        from: source,
        to: `packages/vue/src`,
      }),
    ),

    generateEntry({
      from: `packages/vue/src/components/*`,
      to: `packages/vue/src`,
      extName: `.vue`,
    }),
  );
}
