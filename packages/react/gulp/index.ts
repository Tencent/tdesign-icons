import { parallel, series } from 'gulp';

import { generateEntry } from '../../../gulp/generate-entry';
import { generateManifest } from '../../../gulp/generate-manifest';
import { generateTypeMap } from '../../../gulp/generate-type-map';

import { generateIcons } from '../../../gulp/generate-icons';
import { clearDir } from '../../../gulp/clean-dir';

import { reactGetIconFileContent } from './react-use-template';

export function reactTask(source: string[]) {
  return series(
    clearDir(['packages/react/src/components']),

    parallel(
      generateIcons({
        from: source,
        to: 'packages/react/src/components',
        iconGenerator: reactGetIconFileContent,
        options: {
          replaceColor: true,
        },
      }),

      generateManifest({
        from: source,
        to: 'packages/react/src',
      }),
      generateTypeMap({
        from: source,
        to: 'packages/react/src',
        type: 'react',
      }),
    ),

    generateEntry({
      from: 'packages/react/src/components/*',
      to: 'packages/react/src',
    }),
  );
}
