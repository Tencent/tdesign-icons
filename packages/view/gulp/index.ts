import { series } from 'gulp';

import { generateViewMap } from '../../../gulp/generate-view-map';
import { clearDir } from '../../../gulp/clean-dir';

export function iconViewTask(source: string[]) {
  return series(
    clearDir(['packages/view/src']),

    generateViewMap({
      from: source,
      to: 'packages/view/src',
    }),
  );
}
