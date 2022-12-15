import { dest, src } from 'gulp';
import rename from 'gulp-rename';

import { svgToElement, SvgToElementOptions } from './svg-info-check';
import { svgo, SVGOConfig } from './svgo';
import { useTemplate, IconFileContentGenerator } from './use-template';

interface GenerateIconOptions {
  from: string[];
  to: string;
  iconGenerator: IconFileContentGenerator;
  options?: SvgToElementOptions;
  extName?: string;
  config?: SVGOConfig;
}

export const generateIcons = ({
  from, to, iconGenerator, extName = '.tsx', config, options,
}: GenerateIconOptions) => function generateIcons() {
  return src(from)
    .pipe(svgo(config))
    .pipe(svgToElement(options))
    .pipe(useTemplate(iconGenerator))
    .pipe(
      rename((file) => {
        if (file.basename) {
          // eslint-disable-next-line no-param-reassign
          file.extname = extName;
        }
      }),
    )
    .pipe(dest(to));
};
