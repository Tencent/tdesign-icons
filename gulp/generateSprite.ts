import { dest, src } from 'gulp';
import svgSprite from 'gulp-svg-sprite';
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
