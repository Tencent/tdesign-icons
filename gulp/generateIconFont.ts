import { dest, src } from 'gulp';
import concat from 'gulp-concat';
import iconfont from 'gulp-iconfont';
import iconfontCss from 'gulp-iconfont-css';
import { createTransformStream } from './transform';
const runTimestamp = Math.round(Date.now() / 1000);
const svgMap: any = {};
interface GLYPHS {
  name: string;
  unicode: string;
}
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
          fontName: 'index', // required
          prependUnicode: true, // recommended option
          formats: ['ttf', 'eot', 'woff', 'svg'], // default, 'woff2' and 'svg' are available
          timestamp: runTimestamp, // recommended to get consistent builds when watching files
        }),
      )
      .on('glyphs', (glyphs: GLYPHS[]) => {
        glyphs.forEach((item) => {
          svgMap[item.name] = item.unicode;
        });
      })
      .pipe(dest(targetDir));
  };

export const generateIconFontJson = ({ iconGlob, targetDir }: { iconGlob: string; targetDir: string }) =>
  function generateIconFont() {
    return src([iconGlob])
      .pipe(useItemJsonTemplate())
      .pipe(concat('index.json'))
      .pipe(useJsonTemplate())
      .pipe(dest(targetDir));
  };

function useItemJsonTemplate() {
  function getItem(content: string, name: string) {
    return `{"name": "${name}","svgCode": '${content}',"codepoint": "\\\\${escape(svgMap[name]).replace('%u', '')}"},`;
  }
  return createTransformStream((_, { stem: name }) => getItem(_, name));
}

function useJsonTemplate() {
  function getContainer(content: string) {
    return `
    {"iconName":"t","icons":[${content}]}`;
  }
  return createTransformStream((content) => getContainer(content));
}
