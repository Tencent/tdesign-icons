import { parallel, series } from 'gulp';

import { generateEntry } from '../../../gulp/generate-entry';
import { generateManifest } from '../../../gulp/generate-manifest';
import { generateIcons } from '../../../gulp/generate-icons';
import { clearDir } from '../../../gulp/clean-dir';

import { vueGetIconFileContent } from './vue-use-template';

export function vueTask(source: string[]) {
  return series(
    clearDir(['packages/vue/dist', 'packages/vue/src/components']),

    parallel(
      generateIcons({
        from: [...source],
        to: 'packages/vue/src/components',
        iconGenerator: vueGetIconFileContent,
        options: {
          replaceColor: true,
        },
      }),

      generateManifest({
        from: source,
        to: 'packages/vue/src',
      }),
    ),

    generateEntry({
      from: 'packages/vue/src/components/*',
      to: 'packages/vue/src',
    }),
  );
}
