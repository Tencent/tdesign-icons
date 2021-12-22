import { src, dest } from 'gulp';
import concat from 'gulp-concat';

import { createTransformStream } from './transform';

const elememtWrapperStyle = 'width: 110px; height: 110px; font-size: 12px; display: flex; align-items: center; justify-content: center; flex-direction: column;cursor: pointer; border-radius: 6px';

function useItemTemplate() {
  function getItem(element:string, stem: string) {
    return `<clipboard-copy value='<icon name="${stem}" />'><div class="tdesign-svg-wrapper" style="${elememtWrapperStyle}" onclick="\${showTast}">${element.replace(/black/g, 'currentColor').replace(/"16"/g, '"2em"')}<div style="margin-top: 12px; text-align:center">${stem}</div></div></clipboard-copy>`;
  }

  return createTransformStream((element, { stem: name }) => getItem(element, name));
}

function useWrapperTemplate() {
  function getWrapper(content: string) {
    return `import { html, define } from 'hybrids';
import '@github/clipboard-copy-element';
import 'lit-toast/lit-toast.js';

function showTast(host) {
  host.shadowRoot.querySelector('lit-toast').show('复制成功', 2000);
}

export default define({
    tag: 'td-icons-view',
    opened: false,
    render: ({ opened }) => html\`<div style="display:flex;flex-wrap:wrap">${content}</div><lit-toast></lit-toast><style>.tdesign-svg-wrapper:hover { background:var(--bg-color-demo-hover)}</style>\`,
});`;
  }

  return createTransformStream((content) => getWrapper(content));
}

export const generateViewMap = ({ from, to }: { from: string[]; to: string }) => function generateMap() {
  return src(from)
    .pipe(useItemTemplate())
    .pipe(concat('NOT-VALID'))
    .pipe(useWrapperTemplate())
    .pipe(concat('index.js'))
    .pipe(dest(to));
};
