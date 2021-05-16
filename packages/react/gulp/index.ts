import { parallel, series } from 'gulp';

import { generateEntry } from '../../../gulp/generateEntry';
import { generateManifest } from '../../../gulp/generateManifest';
import { generateIcons } from '../../../gulp/generateIcons';
import { clearDir } from '../../../gulp/cleanDir';

import { reactGetIconFileContent } from './react-use-template';

export function reactTask(source: string[]) {
  return series(
    clearDir(['packages/react/dist', 'packages/react/src/components']),

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
        to: `packages/react/src`,
      }),
    ),

    generateEntry({
      from: `packages/react/src/components/*`,
      to: `packages/react/src`,
    }),
  );
}
