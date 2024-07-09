// to avoid append script repeatedly
function loadScript(url: string, className: string) {
  if (!document || !url || typeof url !== 'string') return;

  if (document.querySelectorAll(`.${className}[src="${url}"]`).length > 0) {
    return;
  }

  const svg = document.createElement('script');
  svg.setAttribute('class', className);
  svg.setAttribute('src', url);
  document.body.appendChild(svg);
}

// to avoid append link repeatedly
function loadLink(url: string, className: string) {
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

function loadStylesheet() {
  const styleSheetId = '__TDESIGN_ICON_STYLE__';
  const iconStyleString = `@keyframes t-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .t-icon {
    display: inline-block;
    vertical-align: middle;
    width: 1em;
    height: 1em;
  }
  .t-icon::before {
    font-family: unset;
  }
  .t-icon-loading {
    animation: t-spin 1s linear infinite;
  }
  .t-icon {
    fill: currentColor;
  }
  .t-icon.t-size-s,
  i.t-size-s {
    font-size: 14px;
  }
  .t-icon.t-size-m,
  i.t-size-m {
    font-size: 16px;
  }
  .t-icon.t-size-l,
  i.t-size-l {
    font-size: 18px;
  }
  `;

  if (!document || document.getElementById(styleSheetId)) return;

  const styleSheet = document.createElement('style');
  styleSheet.setAttribute('id', styleSheetId);

  styleSheet.innerHTML = iconStyleString;

  document.head.appendChild(styleSheet);
}

export { loadScript, loadLink, loadStylesheet };
