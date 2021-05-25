import { parallel, series } from 'gulp';

import { generateManifest } from '../../../gulp/generate-manifest';
import { generateIcons } from '../../../gulp/generate-icons';
import { clearDir } from '../../../gulp/clean-dir';
import { angularGetIconFileContent } from './angular-use-template';
import { angularGenerateEntry } from './angular-generate-entry';

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
