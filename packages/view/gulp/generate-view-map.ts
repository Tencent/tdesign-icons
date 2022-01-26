import { src, dest } from 'gulp';
import path from 'path';
import fs from 'fs';
import concat from 'gulp-concat';

import { createTransformStream } from '../../../gulp/transform';
import { useTemplate } from '../../../gulp/use-template';

const elementWrapperStyle = 'width: 110px; height: 110px; font-size: 12px; display: flex; align-items: center; justify-content: center; flex-direction: column;cursor: pointer; border-radius: 6px';

function useItemTemplate() {
  function getItem(element:string, stem: string) {
    return `<clipboard-copy value='<icon name="${stem}" />'><div class="tdesign-svg-wrapper" style="${elementWrapperStyle}" onclick="showToast">${element.replace(/black/g, 'currentColor').replace(/"16"/g, '"2em"')}<div style="margin-top: 12px; text-align:center">${stem}</div></div></clipboard-copy>`;
  }

  return createTransformStream((element, { stem: name }) => getItem(element, name));
}

function generateCompleteComponent({ element }:{element:string}) {
  const template = fs.readFileSync(path.resolve(__dirname, 'template/view.js'), 'utf-8');

  return template
    .replace(/\$CONTENT/g, element);
}

export const generateViewMap = ({ from, to }: { from: string[]; to: string }) => function generateMap() {
  return src(from)
    .pipe(useItemTemplate())
    .pipe(concat('index.js'))
    .pipe(useTemplate(generateCompleteComponent))
    .pipe(dest(to));
};
