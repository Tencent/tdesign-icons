import { parallel, series } from 'gulp';

import { generateManifest } from '../../../gulp/generateManifest';
import { generateIcons } from '../../../gulp/generateIcons';
import { clearDir } from '../../../gulp/cleanDir';
import { angularGetIconFileContent } from './angularUseTemplate';
import { angularGenerateEntry } from './angularGenerateEntry';

export function angularTask(source: string[]) {
  return series(
    clearDir(['packages/angular/dist', 'packages/angular/projects/tdesign-icons-angular/src/lib/components']),

    parallel(
      generateIcons({
        from: source,
        to: 'packages/angular/projects/tdesign-icons-angular/src/lib/components',
        iconGenerator: angularGetIconFileContent,
        options: {
          replaceColor: true,
        },
        extName: '.component.ts',
      }),

      generateManifest({
        from: source,
        to: `packages/angular/projects/tdesign-icons-angular/src/lib`,
      }),
    ),

    angularGenerateEntry({
      from: `packages/angular/projects/tdesign-icons-angular/src/lib/components/*`,
      to: `packages/angular/projects/tdesign-icons-angular/src/lib`,
    }),
  );
}
