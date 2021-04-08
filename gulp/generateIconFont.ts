import { dest, src } from 'gulp';
import chalk from 'chalk';
import iconfont from 'gulp-iconfont';
import iconfontCss from 'gulp-iconfont-css';
const runTimestamp = Math.round(Date.now() / 1000);
export const generateIconFont = ({
  iconGlob,
  targetDir,
  fontCssConfig,
}: {
  iconGlob: string;
  targetDir: string;
  fontCssConfig: Object;
}) =>
  function generateIconFont() {
    return src([iconGlob])
      .pipe(iconfontCss(fontCssConfig))
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
