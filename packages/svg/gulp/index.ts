import { parallel, series } from 'gulp';

import { generateIcons } from '../../../gulp/generateIcons';
import { svgGenIconFileContent } from './svgUseTemplate';

export function svgTask(source: string[]) {
  return series(
    parallel(
      generateIcons({
        from: [...source],
        to: 'packages/svg/src',
        iconGenerator: svgGenIconFileContent,
        extName: '.svg',
        options: {
          replaceColor: true,
        },
        config: {
          removeXMLNS: false,
        },
      }),
    ),
  );
}
