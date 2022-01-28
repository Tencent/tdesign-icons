import { src, dest } from 'gulp';
import path from 'path';
import fs from 'fs';
import concat from 'gulp-concat';

import { createTransformStream } from '../../../gulp/transform';
import { useTemplate } from '../../../gulp/use-template';

function clearAndUpper(text:string) {
  return text.replace(/-/, '').toUpperCase();
}

function toPascalCase(text:string) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

function useItemTemplate() {
  function getItem(element:string, stem: string) {
    const pascalIconName = toPascalCase(stem);
    return `<div class="t-icons-view__wrapper">
    ${element.replace(/black/g, 'currentColor').replace(/"16"/g, '"2em"')}
    <div class="t-icons-view__name" style="margin-top: 12px; text-align:center">${stem}</div>
    <div class="t-icons-view__actions" style="margin-top: 12px; text-align:center">
      \${showType === 'develop' ? developHTML('${stem}', '${pascalIconName}') : designHTML('${stem}' ,\`${element}\`)}
    </div>
  </div>`;
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
