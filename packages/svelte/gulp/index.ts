import { parallel, series } from 'gulp';

import { generateEntry } from '../../../gulp/generate-entry';
import { generateManifest } from '../../../gulp/generate-manifest';
import { generateTypeMap } from '../../../gulp/generate-type-map';

import { generateIcons } from '../../../gulp/generate-icons';
import { clearDir } from '../../../gulp/clean-dir';

import { svelteGetIconFileContent } from './svelte-use-template';

export function svelteTask(source: string[]) {
  return series(
    clearDir(['packages/svelte/src/lib/components']),

    parallel(
      generateIcons({
        from: source,
        to: 'packages/svelte/src/lib/components',
        iconGenerator: svelteGetIconFileContent,
        extName: '.svelte',
        options: {
          replaceColor: true,
          propsString: true,
        },
      }),

      generateManifest({
        from: source,
        to: 'packages/svelte/src/lib',
      }),
      generateTypeMap({
        from: source,
        to: 'packages/svelte/src/lib',
        type: 'svelte',
      }),
    ),

    generateEntry({
      from: 'packages/svelte/src/lib/components/*',
      to: 'packages/svelte/src/lib',
      extName: '.svelte',
      framework: 'svelte',
    }),
  );
}
