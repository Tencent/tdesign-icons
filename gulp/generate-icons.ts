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
  /**
   * 在交给 iconGenerator 之前对元素树 JSON 做一次字符串转换，
   * 用于把 props.xxx 引用改写成其他形式的占位符（如 uni-app 的 {f1||'currentColor'}）
   */
  transformElement?: (elementJson: string, name: string) => string;
  /**
   * 输出到同名子目录：`<to>/<name>/<name><extName>`。
   * uni_modules 的 easycom 只识别 `components/<name>/<name>.vue` 这种两级结构，需要开启。
   */
  dirname?: boolean;
  /**
   * 输出文件名后缀，例如 `-icon` 会得到 `close-icon.vue`；
   * 与 `dirname` 同时开启时为 `components/close-icon/close-icon.vue`。
   */
  filenameSuffix?: string;
}

export const generateIcons = ({
  from, to, iconGenerator, extName = '.tsx', config, options, transformElement, dirname, filenameSuffix = '',
}: GenerateIconOptions) => function generateIcons() {
  return src(from)
    .pipe(svgo(config))
    .pipe(svgToElement(options))
    .pipe(
      useTemplate(
        transformElement
          ? ({ name, element }) => iconGenerator({ name, element: transformElement(element, name) })
          : iconGenerator,
      ),
    )
    .pipe(
      rename((file) => {
        if (file.basename) {
          // eslint-disable-next-line no-param-reassign
          file.extname = extName;
          if (filenameSuffix) {
            // eslint-disable-next-line no-param-reassign
            file.basename += filenameSuffix;
          }
          if (dirname) {
            // eslint-disable-next-line no-param-reassign
            file.dirname = file.basename;
          }
        }
      }),
    )
    .pipe(dest(to));
};
