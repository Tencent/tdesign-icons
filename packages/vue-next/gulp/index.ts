import { parallel, series } from 'gulp';

import { generateEntry } from '../../../gulp/generate-entry';
import { generateManifest } from '../../../gulp/generate-manifest';
import { generateIcons } from '../../../gulp/generate-icons';
import { clearDir } from '../../../gulp/clean-dir';

import { vueGetIconFileContent } from './vue-use-template';

export function vueNextTask(source: string[]) {
  return series(
    clearDir(['packages/vue-next/dist', 'packages/vue-next/src/components']),

    parallel(
      generateIcons({
        from: [...source],
        to: 'packages/vue-next/src/components',
        iconGenerator: vueGetIconFileContent,
        options: {
          replaceColor: true,
        },
      }),

      generateManifest({
        from: source,
        to: 'packages/vue-next/src',
      }),
    ),

    generateEntry({
      from: 'packages/vue-next/src/components/*',
      to: 'packages/vue-next/src',
    }),
  );
}
