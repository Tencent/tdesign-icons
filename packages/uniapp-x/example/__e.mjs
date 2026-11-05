import { JSDOM, VirtualConsole } from '/workspace/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/api.js';
import { build } from '/workspace/node_modules/.pnpm/esbuild@0.20.2/node_modules/esbuild/lib/main.js';

const base = 'http://localhost:5175';

const httpPlugin = {
  name: 'fetch-url',
  setup(b) {
    b.onResolve({ filter: /.*/ }, (args) => {
      if (args.kind === 'entry-point') return { path: args.path, namespace: 'http' };
      if (args.path.startsWith('/')) return { path: base + args.path, namespace: 'http' };
      if (args.path.startsWith('http')) return { path: args.path, namespace: 'http' };
      return null;
    });
    b.onLoad({ filter: /.*/, namespace: 'http' }, async (args) => {
      const r = await fetch(args.path);
      const text = await r.text();
      return { contents: text, loader: 'js', resolveDir: '/' };
    });
  },
};

const out = await build({
  entryPoints: [base + '/main'],
  bundle: true,
  write: false,
  format: 'iife',
  platform: 'browser',
  plugins: [httpPlugin],
  logLevel: 'silent',
  define: { 'process.env.NODE_ENV': '"development"' },
});
const code = out.outputFiles[0].text;
console.log('打包体积:', code.length);

const logs = [];
const vc = new VirtualConsole();
vc.on('jsdomError', (e) => logs.push('[jsdomError] ' + (e.message || e)));
for (const lv of ['error', 'warn', 'log']) {
  vc.on(lv, (...a) => logs.push(`[${lv}] ` + a.map((x) => String(x)).join(' ').slice(0, 500)));
}

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="app"></div></body></html>', {
  url: base + '/',
  pretendToBeVisual: true,
  virtualConsole: vc,
  runScripts: 'dangerously',
});

const w = dom.window;
// jsdom 缺的浏览器 API
w.matchMedia = (q) => ({ matches: false, media: q, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false; } });
w.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
w.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
w.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
w.cancelAnimationFrame = (id) => clearTimeout(id);
w.scrollTo = () => {};
// 修 jsdom 的 URL 解析：uni-h5 会 new URL(undefined)
const OrigURL = w.URL;
w.URL = class extends OrigURL {
  constructor(u, b) {
    super(u === undefined ? base + '/' : u, b || base + '/');
  }
};

const s = w.document.createElement('script');
s.textContent = code;
w.document.body.appendChild(s);

await new Promise((r) => setTimeout(r, 2500));

console.log('\n=== 日志（前 25 条）===');
logs.slice(0, 25).forEach((l) => console.log(l.split('\n')[0].slice(0, 260)));

const app = w.document.getElementById('app');
console.log('\n=== #app 长度 ===', app.innerHTML.length);
console.log('=== 元素数 ===', w.document.querySelectorAll('*').length);
console.log('=== img/uni-image 数 ===', w.document.querySelectorAll('img, uni-image').length);
console.log('=== 可见文本 ===', w.document.body.textContent.replace(/\s+/g, ' ').trim().slice(0, 260));
