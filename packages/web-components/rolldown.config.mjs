import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import babel from '@rolldown/plugin-babel';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * tdesign-icons-web-components · rolldown 构建配置
 *
 * 等价替代原 rollup.config.js：
 *  - 多入口逐文件输出、treeshake:false、_chunks/dep-[hash].js、[name].js
 *  - babel：@babel/preset-env 降级到 ES5 + decorators/class-properties 编译
 *    + @babel/plugin-transform-react-jsx（pragma: h / pragmaFrag: h.f）保持 omi JSX 形态
 *  - iconfont 字体文件（t.eot/svg/ttf/woff + index.css）构建后复制到 esm/iconfont 与 lib/iconfont
 */
const external = ['omi', '@babel/runtime'];

function collectInputs() {
  const input = {};
  const srcDir = path.join(__dirname, 'src');
  const dirs = ['', 'components', 'iconfont', 'svg-sprite', 'util'];
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

const babelPlugin = babel({
  presets: [['@babel/preset-env', { modules: false }]],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-transform-react-jsx', { pragma: 'h', pragmaFrag: 'h.f' }],
    '@babel/plugin-transform-runtime',
  ],
});

function copyIconFont() {
  const fromDir = path.join(__dirname, 'src/iconfont');
  for (const out of ['esm', 'lib']) {
    const toDir = path.join(__dirname, out, 'iconfont');
    fs.mkdirSync(toDir, { recursive: true });
    for (const f of ['t.eot', 't.svg', 't.ttf', 't.woff', 'index.css']) {
      fs.copyFileSync(path.join(fromDir, f), path.join(toDir, f));
    }
  }
}

const iconFontPlugin = {
  name: 'copy-icon-font',
  closeBundle() {
    copyIconFont();
  },
};

const outputDir = (name) => path.join(__dirname, name);

const multiConfig = {
  input: inputList,
  treeshake: false,
  external,
  plugins: [iconFontPlugin, babelPlugin],
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
  plugins: [iconFontPlugin, babelPlugin],
};

export default [
  {
    ...multiConfig,
    output: { ...multiConfig.output, dir: outputDir('esm'), format: 'esm' },
  },
  {
    ...multiConfig,
    output: {
      ...multiConfig.output, dir: outputDir('lib'), format: 'cjs', exports: 'named',
    },
  },
  {
    ...umdBase,
    output: {
      name: 'TDesignIconWebComponents',
      format: 'umd',
      exports: 'named',
      globals: { omi: 'omi' },
      sourcemap: true,
      file: path.join(__dirname, 'dist/index.js'),
    },
  },
  {
    ...umdBase,
    output: {
      name: 'TDesignIconWebComponents',
      format: 'umd',
      exports: 'named',
      globals: { omi: 'omi' },
      sourcemap: true,
      file: path.join(__dirname, 'dist/index.min.js'),
      minify: true,
    },
  },
];
