import { html, define } from 'hybrids';
import '@github/clipboard-copy-element';
import 'tdesign-site-components';
import 'tdesign-site-components/lib/styles/style.css';

function handleDownload() {
  const iconNameEl = e.target.parentElement.parentElement.previousElementSibling;
  if (!iconNameEl) return;

  const iconName = iconNameEl.textContent.trim();
  const symbolEl = document.getElementById(`t-icon-${iconName}`);
  if (!symbolEl) return;

  const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">${symbolEl.innerHTML}</svg>`;

  const blob = new Blob([svgCode], { type: 'image/svg+xml' });
  const imgUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.download = `${iconName}.svg`;
  a.target = '_blank';
  a.href = imgUrl;
  a.click();
}

function showToast() {
  window.showTdMessage({ content: '复制成功', theme: 'success' });
}

export default define({
  tag: 'td-icons-view',
  opened: false,
  render: ({ opened }) => html`<div style="display:flex;flex-wrap:wrap">$CONTENT</div>`,
});
