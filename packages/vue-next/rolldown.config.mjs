import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import babel from '@rolldown/plugin-babel';
import postcss from 'postcss';
import cssnano from 'cssnano';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * tdesign-icons-vue-next · rolldown 构建配置
 *
 * 等价替代原 rollup.config.js，要点同 packages/vue：
 *  - 多入口逐文件输出、treeshake:false、_chunks/dep-[hash].js、[name].js
 *  - @vue/babel-preset-jsx 编译 JSX 为 h()
 *  - css 保持 external，esm/lib 落 style/index.css，dist 落 index.css / index.min.css
 */
const external = ['vue', '@babel/runtime'];

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
      input[dir ? `${dir}/${stem}` : stem] = path.join(abs, f);
    }
  }
  return input;
}

const inputList = collectInputs();

// rolldown 1.x 已移除 CSS 打包：
//  - esm: 保留 `import "./index.css"`（与发布版一致）
//  - cjs/umd: 剥离 css 引用（发布版 lib/style/css.js 为空文件）
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

function writeMinCss() {
  const src = fs.readFileSync(path.join(__dirname, 'src/style/index.css'), 'utf8');
  return postcss([cssnano]).process(src, { from: undefined }).then((result) => {
    fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
    fs.writeFileSync(path.join(__dirname, 'dist/index.min.css'), result.css);
  });
}

const stylePlugin = {
  name: 'copy-style',
  closeBundle() {
    copyStyles();
    return writeMinCss();
  },
};

const emptyCss = makeCssPlugin({ external: false });
const cssExternal = makeCssPlugin({ external: true });

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

const umdBase = {
  input: path.join(__dirname, 'src/index.ts'),
  treeshake: false,
  external,
  plugins: [stylePlugin, emptyCss, babelPlugin],
};

export default [
  {
    ...multiConfig,
    output: { ...multiConfig.output, dir: outputDir('esm'), format: 'esm' },
    plugins: [stylePlugin, cssExternal, babelPlugin],
  },
  {
    ...multiConfig,
    output: {
      ...multiConfig.output, dir: outputDir('lib'), format: 'cjs', exports: 'named',
    },
    plugins: [stylePlugin, emptyCss, babelPlugin],
  },
  {
    ...umdBase,
    output: {
      name: 'TDesignIconVueNext',
      format: 'umd',
      exports: 'named',
      globals: { vue: 'Vue' },
      sourcemap: true,
      file: path.join(__dirname, 'dist/index.js'),
    },
  },
  {
    ...umdBase,
    output: {
      name: 'TDesignIconVueNext',
      format: 'umd',
      exports: 'named',
      globals: { vue: 'Vue' },
      sourcemap: true,
      file: path.join(__dirname, 'dist/index.min.js'),
      minify: true,
    },
  },
];
