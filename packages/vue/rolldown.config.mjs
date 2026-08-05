import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import babel from '@rolldown/plugin-babel';
import postcss from 'postcss';
import cssnano from 'cssnano';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * tdesign-icons-vue · rolldown 构建配置
 *
 * 等价替代原 rollup.config.js：
 *  - 用“源码目录全量 .ts/.tsx 收集”替代 rollup-plugin-multi-input，保持每个组件独立成文件
 *  - treeshake: false 保证各入口完整输出（导出契约不变）
 *  - chunk 命名保持 _chunks/dep-[hash].js，入口命名保持 [name].js
 *  - @vue/babel-preset-jsx 将 JSX 编译为 render 函数内的 h()（与 rollup 时代产物一致）
 *  - rolldown 已移除 CSS 打包能力，改为：esm/lib 中保留 `import "./index.css"`，
 *    由构建后复制 src/style/index.css 到 esm/style/ 与 lib/style/，dist 的 index.css 同理复制
 */
const external = ['vue', '@babel/runtime', 'classnames'];

function collectInputs() {
  const input = {};
  const srcDir = path.join(__dirname, 'src');
  const dirs = ['', 'components', 'iconfont', 'iconfont/props', 'style', 'svg-sprite', 'svg-sprite/props', 'utils'];
  for (const dir of dirs) {
    const abs = path.join(srcDir, dir);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs)) {
      if (!/\.tsx?$/.test(f)) continue;
      const stem = f.replace(/\.tsx?$/, '');
      if (stem === 'shims.d') continue;
      input[dir ? `${dir}/${stem}` : stem] = path.join(abs, f);
    }
  }
  input['shims.d'] = path.join(srcDir, 'shims.d.ts');
  return input;
}

const inputList = collectInputs();

// rolldown 1.x 已移除 CSS 打包：
//  - esm: 保留 `import "./index.css"`（与发布版一致）
//  - cjs/umd: 剥离 css 引用（发布版 lib/style/css.js 为空文件，require 时不加载 css）
function makeCssPlugin({ external: keepExternal }) {
  return {
    name: keepExternal ? 'css-external' : 'css-strip',
    resolveId(source) {
      if (!source.endsWith('.css')) return null;
      return keepExternal ? { id: source, external: true } : '\0css-empty';
    },
    load(id) {
      if (id === '\0css-empty') return '';
      return null;
    },
  };
}

const babelPlugin = babel({
  presets: [
    ['@babel/preset-env', { modules: false }],
    ['@vue/babel-preset-jsx', {}],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
});

function copyStyles() {
  const src = path.join(__dirname, 'src/style/index.css');
  const targets = [
    path.join(__dirname, 'esm/style/index.css'),
    path.join(__dirname, 'lib/style/index.css'),
    path.join(__dirname, 'dist/index.css'),
  ];
  for (const target of targets) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(src, target);
  }
}

// 压缩版样式：等价原 rollup-plugin-postcss 的 minimize（cssnano）
function writeMinCss() {
  const src = fs.readFileSync(path.join(__dirname, 'src/style/index.css'), 'utf8');
  return postcss([cssnano]).process(src, { from: undefined }).then((result) => {
    fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
    fs.writeFileSync(path.join(__dirname, 'dist/index.min.css'), result.css);
  });
}

// 所有构建完成后同步样式产物
const stylePlugin = {
  name: 'copy-style',
  closeBundle() {
    copyStyles();
    return writeMinCss();
  },
};

const outputDir = (name) => path.join(__dirname, name);

const multiConfig = {
  input: inputList,
  treeshake: false,
  external,
  output: {
    sourcemap: true,
    chunkFileNames: '_chunks/dep-[hash].js',
    entryFileNames: '[name].js',
  },
};

// UMD 剥离 css 引用（dist/index.css 由 copyStyles 单独产出）
const umdBase = {
  input: path.join(__dirname, 'src/index.ts'),
  treeshake: false,
  external: ['vue', '@babel/runtime', 'classnames'],
  plugins: [stylePlugin, makeCssPlugin({ external: false }), babelPlugin],
};

export default [
  {
    ...multiConfig,
    plugins: [stylePlugin, makeCssPlugin({ external: true }), babelPlugin],
    output: { ...multiConfig.output, dir: outputDir('esm'), format: 'esm' },
  },
  {
    ...multiConfig,
    plugins: [stylePlugin, makeCssPlugin({ external: false }), babelPlugin],
    output: {
      ...multiConfig.output, dir: outputDir('lib'), format: 'cjs', exports: 'named',
    },
  },
  {
    ...umdBase,
    output: {
      name: 'TDesignIconVue',
      format: 'umd',
      exports: 'named',
      globals: { vue: 'Vue', classnames: 'classNames' },
      sourcemap: true,
      file: path.join(__dirname, 'dist/index.js'),
    },
  },
  {
    ...umdBase,
    output: {
      name: 'TDesignIconVue',
      format: 'umd',
      exports: 'named',
      globals: { vue: 'Vue', classnames: 'classNames' },
      sourcemap: true,
      file: path.join(__dirname, 'dist/index.min.js'),
      minify: true,
    },
  },
];
