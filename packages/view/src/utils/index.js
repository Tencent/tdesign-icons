export function getRoot() {
  return document.querySelector('td-icons-view')?.shadowRoot || document;
}
export function calcNavHighlight() {
  function getLinkTopList(anchorList) {
    const linkList = anchorList.map((anchor) => {
      const [, id] = decodeURIComponent(anchor.href).split('#');
      return getRoot().getElementById(id);
    });
    return linkList.map((link) => {
      if (!link) return 0;
      const { top } = link.getBoundingClientRect();
      return top + document.documentElement.scrollTop;
    });
  }
  const anchorList = Array.from(getRoot()?.querySelectorAll('.categories-link')) || [];
  const linkTopList = getLinkTopList(anchorList);
  return {
    anchorList,
    linkTopList,
  };
}

export function anchorHighlight(anchorList, linkTopList) {
  const { scrollTop } = getRoot()?.querySelector('.t-icons-view__content');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < linkTopList.length; i++) {
    if (scrollTop <= linkTopList[i]) {
      if (anchorList[i].classList.contains('active')) break;
      anchorList.forEach((anchor) => anchor.classList.remove('active'));
      anchorList[i].classList.add('active');
      break;
    }
  }
}

export function proxyTitleAnchor(e) {
  if (e.target.tagName !== 'A') return;
  e.preventDefault();
  const { target } = e;
  const href = decodeURIComponent(target.href);
  if (!href.includes('#')) return;

  const [, id = ''] = href.split('#');
  if (target.classList.contains('categories-link')) {
    const idTarget = getRoot()?.getElementById(id);
    if (!idTarget) return;
    const { top } = idTarget.getBoundingClientRect();
    const target = getRoot()?.querySelector('.t-icons-view__content');
    const { scrollTop } = target;

    const offsetTop = top + scrollTop;

    requestAnimationFrame(() => target.scrollTo({ top: offsetTop - 232, left: 0 }));
  }
}
