import { html, define } from 'hybrids';
import '@github/clipboard-copy-element';

function handleDownload(iconName, svgString) {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const imgUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.download = `${iconName}.svg`;
  a.target = '_blank';
  a.href = imgUrl;
  a.click();
}

function showToast() {
  if (window.showTdMessage) {
    // would register by tdesign-site-components
    window.showTdMessage({ content: '复制成功', theme: 'success', duration: 1000 });
  }
}

const css = `
  .t-icons-view__wrapper { 
    width: calc(1 / 6 * 100%);
    height: 100px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer; 
    border-radius: 6px;
    position: relative;
  }
  .t-icons-view__wrapper:hover { background:var(--bg-color-demo-hover)}
  .t-icons-view__wrapper:hover > .t-icons-view__name {
    opacity: 0;
    visibility: hidden;
  }
  .t-icons-view__wrapper:hover > .t-icons-view__actions {
    opacity: 1;
    visibility: visible;
  }
  .t-icons-view__actions {
    position: absolute;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    opacity: 0;
    visibility: hidden;
    transition: all .1s linear;
  }
  .t-icons-view__actions-divider {
    border-left: 1px solid var(--component-border);
    border-top: 0;
    display: inline-block;
    height: 0.9em;
    margin: 0 8px;
    vertical-align: middle;
  }

  .t-icons-view__actions span {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    transition: all .2s linear;
    color: var(--text-secondary);
  }

  .t-icons-view__actions span:hover {
    color: var(--text-primary);
  }
`;

const downloadSvg = html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" view-box="0 0 16 16" width="1em" height="1em" class="t-icon t-icon-download"><path fill="currentColor" d="M12.26 5.81L8.5 9.58V.5h-1v9.08L3.74 5.8l-.71.71 4.62 4.62c.2.2.5.2.7 0l4.62-4.62-.7-.7z" fill-opacity="0.9"></path><path fill="currentColor" d="M2 11v2a1 1 0 001 1h10a1 1 0 001-1v-2h-1v2H3v-2H2z" fill-opacity="0.9"></path></svg>`;

const fileIconSvg = html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" view-box="0 0 16 16" width="1em" height="1em" class="t-icon t-icon-file-icon"><path d="M3.5 2V14H11.2336V15H3.49534C3.02005 15 2.5 14.6627 2.5 14.0781V1.92191C2.5 1.33727 3.02005 1 3.49534 1H8.86589C9.13442 1 9.39167 1.108 9.57972 1.29969L13.2138 5.004C13.3973 5.19096 13.5 5.44241 13.5 5.70431V7.5H12.5V6.01275H8.50008V2H3.5ZM9.50008 5.01275H11.8215L9.50008 2.64645V5.01275Z" fill="currentColor" fill-opacity="0.9"/>
<path d="M4.48145 9H6.48145V9.8H5.88145V12.2H6.48145V13H4.48145V12.2H5.08145V9.8H4.48145V9Z" fill="currentColor" fill-opacity="0.9"/>
<path d="M8.99999 9H7.79246C7.35479 9 6.99999 9.35817 6.99999 9.8V12.2C6.99999 12.6418 7.35479 13 7.79246 13H8.99999V12.2H7.79246V9.8H8.99999V9Z" fill="currentColor" fill-opacity="0.9"/>
<path d="M13.7972 9.8L13.7972 13H13L13 9H14.7434C15.1837 9 15.5406 9.35817 15.5406 9.8V13H14.7434V9.8H13.7972Z" fill="currentColor" fill-opacity="0.9"/>
<path d="M9.5 9.80928L9.5 12.201C9.5 12.6413 9.85693 12.9982 10.2972 12.9982H11.4931C11.9334 12.9982 12.2903 12.6413 12.2903 12.201V9.80928C12.2903 9.36899 11.9334 9.01205 11.4931 9.01205H10.2972C9.85693 9.01205 9.5 9.36899 9.5 9.80928ZM10.2972 12.201L10.2972 9.80928H11.4931V12.201H10.2972Z" fill="currentColor" fill-opacity="0.9"/>
</svg>`;

const fileCopySvg = html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" view-box="0 0 16 16" width="1em" height="1em" class="t-icon t-icon-file-copy"><path fill="currentColor" d="M4 1.92C4 1.34 4.52 1 5 1h4.37a1 1 0 01.71.3L13.71 5a1 1 0 01.29.7v6.38c0 .58-.52.92-1 .92H5c-.48 0-1-.34-1-.92V1.92zM5 2v10h8V6.01H9V2H5zm5 .65V5h2.32L10 2.65z" fill-opacity="0.9"></path><path fill="currentColor" d="M2 5v9.01a1 1 0 001 1h8v-1H3V5H2z" fill-opacity="0.9"></path></svg>`;

const developHTML = (name, iconName) => html`
<clipboard-copy value='${name}'>
  <span onclick=${showToast}>${fileCopySvg}</span>
</clipboard-copy>
<div class="t-icons-view__actions-divider"></div>
<clipboard-copy value='<${iconName}Icon />'>
  <span onclick=${showToast}>${fileIconSvg}</span>
</clipboard-copy>
`;

const designHTML = (name, svgString) => html`<clipboard-copy value='${svgString}'>
  <span onclick=${showToast}>${fileCopySvg}</span>
</clipboard-copy>
<div class="t-icons-view__actions-divider"></div>
<span onclick=${() => handleDownload(name, svgString)}>${downloadSvg}</span>`;

export default define({
  tag: 'td-icons-view',
  showType: 'develop',
  render: ({ showType }) => html`<div style="display:flex;flex-wrap:wrap">$CONTENT</div>`.css`${css}`,
});
