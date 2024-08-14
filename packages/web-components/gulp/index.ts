import { parallel, series } from 'gulp';

import { generateEntry } from '../../../gulp/generate-entry';
import { generateManifest } from '../../../gulp/generate-manifest';
import { generateTypeMap } from '../../../gulp/generate-type-map';

import { generateIcons } from '../../../gulp/generate-icons';
import { clearDir } from '../../../gulp/clean-dir';

import { wcGetIconFileContent } from './wc-use-template';
import { generateIconsJson } from './generate-icons-json';

export function wcTask(source: string[]) {
  return series(
    clearDir(['packages/web-components/src/components']),

    parallel(
      generateIcons({
        from: source,
        to: 'packages/web-components/src/components',
        iconGenerator: wcGetIconFileContent,
        options: {
          replaceColor: true,
        },
      }),

      generateIconsJson({
        options: {
          replaceColor: true,
        },
      }),

      generateManifest({
        from: source,
        to: 'packages/web-components/src',
      }),
      generateTypeMap({
        from: source,
        to: 'packages/web-components/src',
        type: 'web-components',
      }),
    ),

    generateEntry({
      from: 'packages/web-components/src/components/*',
      to: 'packages/web-components/src',
    }),
  );
}
