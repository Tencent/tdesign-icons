// to avoid append script repeatly
function checkScriptAndLoad(url: string, className: string) {
  if (!document || !url || typeof url !== 'string') return;

  if (document.querySelectorAll(`.${className}[src="${url}"]`).length > 0) {
    return;
  }

  const svg = document.createElement('script');
  svg.setAttribute('class', className);
  svg.setAttribute('src', url);
  document.body.appendChild(svg);
}

// to avoid append link repeatly
function checkLinkAndLoad(url: string, className: string) {
  if (!document || !url || typeof url !== 'string') return;

  if (document.querySelectorAll(`.${className}[href="${url}"]`).length > 0) {
    return;
  }

  const link = document.createElement('link');
  link.setAttribute('class', className);
  link.setAttribute('href', url);

  link.setAttribute('rel', 'stylesheet');
  document.head.appendChild(link);
}

export { checkScriptAndLoad, checkLinkAndLoad };
