import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import babel from '@rolldown/plugin-babel';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * tdesign-icons-react · rolldown 构建配置
 *
 * 等价替代原 rollup.config.js：
 *  - 用“源码目录全量 .ts/.tsx 收集”替代 rollup-plugin-multi-input，保持每个组件独立成文件
 *  - treeshake: false 保证各入口完整输出（导出契约不变）
 *  - chunk 命名保持 _chunks/dep-[hash].js，入口命名保持 [name].js
 *  - babel（@babel/preset-env + @babel/preset-react + @babel/plugin-transform-runtime）
 *    降级到 ES5，保持与 rollup 时代产物一致的语法形态
 */
const external = ['react', 'react-dom', '@babel/runtime'];

function collectInputs() {
  const input = {};
  const srcDir = path.join(__dirname, 'src');
  const dirs = ['', 'components', 'iconfont', 'iconfont/type', 'svg-sprite', 'util'];
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
  presets: [
    ['@babel/preset-env', { modules: false }],
    ['@babel/preset-react', { runtime: 'classic' }],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
});

const outputDir = (name) => path.join(__dirname, name);

const multiConfig = {
  input: inputList,
  treeshake: false,
  external,
  plugins: [babelPlugin],
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
  plugins: [babelPlugin],
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
      name: 'TDesignIconReact',
      format: 'umd',
      exports: 'named',
      globals: { react: 'React' },
      sourcemap: true,
      file: path.join(__dirname, 'dist/index.js'),
    },
  },
  {
    ...umdBase,
    output: {
      name: 'TDesignIconReact',
      format: 'umd',
      exports: 'named',
      globals: { react: 'React' },
      sourcemap: true,
      file: path.join(__dirname, 'dist/index.min.js'),
      minify: true,
    },
  },
];
