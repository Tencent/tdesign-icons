import { dest, src } from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import chalk from 'chalk';
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
    return src(iconGlob, { cwd: iconDir })
      .pipe(svgSprite(config))
      .on('error', (error: string) => {
        /* Do some awesome error handling ... */
        chalk.red(`generateSprite.ts error: ${error}`);
      })
      .pipe(dest(targetDir));
  };
