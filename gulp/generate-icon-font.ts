import { dest, src } from 'gulp';
import { DOMParser, XMLSerializer } from 'xmldom';
import concat from 'gulp-concat';
import iconfont from 'gulp-iconfont';
import iconfontCss from 'gulp-iconfont-css';
import path from 'path';
import fs from 'fs';
import convertStrokeToFill from 'oslllo-svg-fixer';

import { createTransformStream } from './transform';

const webComponentsFontsDir = path.resolve(
  __dirname,
  '../packages/web-components/src/iconfont/',
);
const webComponentsCss = `@font-face {
  font-family: "t";
  src: url('./t.eot'), /* for IE 9*/
  url('./t.eot?#iefix') format("embedded-opentype"), /* under IE9 */
  url('./t.woff') format("woff"),  /* chrome, firefox */
  url('./t.ttf') format("truetype"),  /* opera, Safari, Android, iOS 4.2+ */
  url('./t.svg') format("svg");  /* iOS 4.1- */
  font-weight: normal;
  font-style: normal;
}`;

const runTimestamp = Math.round(Date.now() / 1000);
const svgMap: any = {};
interface GLYPHS {
  name: string;
  unicode: string;
}

const iconFonts: any[] = [];

export const generateIconFont = ({
  iconGlob,
  targetDir,
  fontCssConfig,
}: {
  iconGlob: string;
  targetDir: string;
  fontCssConfig: Object;
}) => async function generateIconFont() {
  await useSvgFixer();
  return src([iconGlob])
    .pipe(iconfontCss(fontCssConfig))
    .pipe(
      iconfont({
        fontName: 't', // required
        prependUnicode: true, // recommended option
        formats: ['svg', 'ttf', 'eot', 'woff'], // default, 'woff2' and 'svg' are available
        timestamp: runTimestamp, // recommended to get consistent builds when watching files
        normalize: true,
        fontHeight: 1024,
      }),
    )
    .on('glyphs', (glyphs: GLYPHS[]) => {
      glyphs.forEach((item) => {
        svgMap[item.name] = item.unicode;
      });
    })
    .pipe(dest(targetDir))
    .on('end', () => {
      // web-components 需要icon的字体文件，不需要使用cdn的方式
      ['t.eot', 't.svg', 't.ttf', 't.woff'].forEach((fileName) => {
        fs.copyFileSync(
          path.resolve(targetDir, fileName),
          path.resolve(webComponentsFontsDir, fileName),
        );
      });
      fs.writeFileSync(
        path.resolve(webComponentsFontsDir, 'index.css'),
        webComponentsCss,
      );
    });
};

function useItemJsonTemplate() {
  function getItem(content: string, name: string) {
    iconFonts.push({
      name,
      codepoint: `\\${escape(svgMap[name]).replace('%u', '')}`,
    });

    return `{"name": "${name}","svgCode": ${JSON.stringify(content).replace(
      /(\r\n|\n|\r)/gm,
      '',
    )},"codepoint": "\\\\${escape(svgMap[name]).replace('%u', '')}"},`;
  }
  return createTransformStream((_, { stem: name }) => getItem(_, name));
}

function useJsonTemplate() {
  function getContainer(content: string) {
    return `{"iconName":"t","icons":[${content}]}`;
  }
  return createTransformStream((content) => getContainer(content));
}

const processSVGFile = async (filePath: string, fileName: string, destination: string) => new Promise((resolve) => {
  const svgContent = fs.readFileSync(filePath, 'utf-8');
  const svgDoc = new DOMParser().parseFromString(svgContent, 'text/html');

  const fill1Path = svgDoc.getElementById('fill1');
  const fill2Path = svgDoc.getElementById('fill2');

  if (fill1Path) svgDoc.removeChild(fill1Path);
  if (fill2Path) svgDoc.removeChild(fill2Path);

  const serializer = new XMLSerializer();
  const modifiedSVG = serializer.serializeToString(svgDoc);

  const finalPath = path.join(destination, fileName);
  fs.writeFileSync(finalPath, modifiedSVG);
  resolve(true);
});

// eslint-disable-next-line no-async-promise-executor
const useSvgFixer = async () => new Promise(async (resolve) => {
  try {
    const sourcePath = path.resolve(__dirname, '../svg');
    const destination = path.resolve(__dirname, '../converted_svg');
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    const files = await fs.promises.readdir(sourcePath);

    // only svg files
    const removeProcesses = files.filter((file) => path.extname(file).toLowerCase() === '.svg').map((file) => {
      const filePath = path.join(sourcePath, file);
      return processSVGFile(filePath, file, destination);
    });

    await Promise.all(removeProcesses);
    // iconfont only support fill path, covert stroke path into fill path
    convertStrokeToFill(destination, destination, { showProgressBar: true }).fix().then(() => {
      resolve(true);
    });
  } catch (error) {
    console.log(error);
  }
});

export const generateIconFontJson = ({
  iconGlob,
  targetDir,
}: {
  iconGlob: string;
  targetDir: string;
}) => function generateIconFont() {
  return src([iconGlob])
    .pipe(useItemJsonTemplate())
    .pipe(concat('index.json'))
    .pipe(useJsonTemplate())
    .pipe(dest(targetDir))
    .on('end', () => {
    // web-components 需要icon的codepoint
      fs.writeFileSync(
        path.resolve(webComponentsFontsDir, 'font-icon.json'),
        JSON.stringify(iconFonts, undefined, 2),
      );
    });
};
