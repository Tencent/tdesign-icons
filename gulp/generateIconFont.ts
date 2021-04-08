import { dest, src } from 'gulp';
import chalk from 'chalk';
import iconfont from 'gulp-iconfont';
const runTimestamp = Math.round(Date.now() / 1000);
export const generateIconFont = ({ iconGlob, targetDir }: { iconGlob: string; targetDir: string }) =>
  function generateIconFont() {
    return src([iconGlob])
      .pipe(
        iconfont({
          fontName: 'myfont', // required
          prependUnicode: true, // recommended option
          formats: ['ttf', 'eot', 'woff'], // default, 'woff2' and 'svg' are available
          timestamp: runTimestamp, // recommended to get consistent builds when watching files
        }),
      )
      .on('glyphs', (glyphs: any, options: any) => {
        // CSS templating, e.g.
        chalk('generateIconFont: ', glyphs, options);
      })
      .pipe(dest(targetDir));
  };
