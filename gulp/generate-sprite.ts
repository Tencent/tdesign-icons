import { dest, src } from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import { getSvgSpriteJSFile } from '../packages/svg-sprite/gulp/use-svg-sprite-template';
import { createTransformStream } from './transform';
import rename from 'gulp-rename';

export const generateSprite = ({
  iconGlob,
  iconDir,
  config,
  targetDir,
}: {
  iconGlob: string;
  iconDir: string;
  config: Object;
  targetDir: string;
}) =>
  function generateSprite() {
    return src(iconGlob, { cwd: iconDir }).pipe(svgSprite(config)).pipe(dest(targetDir));
  };

export const generateSvgSpriteJS = ({ from, to, extName = '.js' }: { from: string; to: string; extName?: string }) =>
  function generateSvgSpriteJS() {
    return src(from)
      .pipe(createTransformStream(() => getSvgSpriteJSFile()))
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
