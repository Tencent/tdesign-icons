// eslint-disable-next-line import/no-webpack-loader-syntax
import themeVariables from '!raw-loader!../styles/vars.css';

const iconViewId = 'TDESIGN_ICON_VIEW';
export function getRoot() {
  return document.querySelector('td-icons-view')?.shadowRoot || document;
}

export function kebabToPascal(str) {
  const words = str.split('-');

  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  return capitalizedWords.join('');
}

export function appendStyleSheet() {
  const componentVariablesExist = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--td-brand-color');
  const siteVariablesExist = window.getComputedStyle(document.documentElement).getPropertyValue('--brand-main');

  if (componentVariablesExist && siteVariablesExist) return;

  const styleSheet = document.createElement('style');
  let variables = '';
  if (!componentVariablesExist) variables += tdesignVariables;
  if (!siteVariablesExist) variables += themeVariables;
  styleSheet.id = iconViewId;
  styleSheet.innerText = variables;
  document.head.appendChild(styleSheet);
}
// 计算锚点和对应的高度
export function calcNavHighlight() {
  function getLinkTopList(anchorList) {
    const linkList = anchorList.map((anchor) => {
      const [, id] = decodeURIComponent(anchor.href).split('#');
      return getRoot().getElementById(id);
    });
    return linkList.map((link) => {
      if (!link) return 0;
      const { top } = link.getBoundingClientRect();
      const containerTop = getRoot()?.querySelector('.t-icons-view').getBoundingClientRect().top;
      return top - containerTop;
    });
  }
  const anchorList = Array.from(getRoot()?.querySelectorAll('.categories-link')) || [];

  const linkTopList = getLinkTopList(anchorList);
  return {
    anchorList,
    linkTopList,
  };
}

export function anchorHighlight(anchorList, linkTopList, scrollElementSelector) {
  const { scrollTop } = getRoot()?.querySelector(scrollElementSelector);
  const categoriesEle = getRoot()?.querySelector('.t-icons-view__categories');

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < linkTopList.length; i++) {
    if (scrollTop <= linkTopList[i]) {
      categoriesEle.scrollTo({ top: 36 * i, left: 0 });
      if (anchorList[i].classList.contains('active')) break;
      anchorList.forEach((anchor) => anchor.classList.remove('active'));
      anchorList[i].classList.add('active');
      break;
    }
  }
}

export function proxyTitleAnchor(e, scrollElementSelector) {
  if (e.target.tagName !== 'A') return;
  e.preventDefault();
  const { target } = e;
  const href = decodeURIComponent(target.href);
  if (!href.includes('#')) return;

  const [, id = ''] = href.split('#');
  if (target.classList.contains('categories-link')) {
    const idTarget = getRoot()?.getElementById(id);

    if (!idTarget) return;

    const containerTop = getRoot()?.querySelector('.t-icons-view').getBoundingClientRect().top;

    const { top } = idTarget.getBoundingClientRect();
    const target = getRoot()?.querySelector(scrollElementSelector);
    const { scrollTop } = target;

    const offsetTop = top + scrollTop - containerTop;
    const headerTop = scrollElementSelector === '.t-icons-view' ? 188 : 80;
    requestAnimationFrame(() => target.scrollTo({ top: offsetTop - headerTop, left: 0 }));
  }
}
