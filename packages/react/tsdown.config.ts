import { defineConfig } from 'tsdown';

const entry = ['src/**/*.ts', 'src/**/*.tsx'];

/**
 * 与 rollup 时代保持一致：
 * - react / react-dom 作为 peerDependency 保持外部引用；
 * - classnames 位于 dependencies，默认按依赖外置（保持 `import classNames from 'classnames'`）；
 *   UMD 产物中单独 alwaysBundle 内联，避免依赖全局 classNames。
 */
const shared = {
  sourcemap: true,
  clean: true,
  treeshake: false,
  platform: 'neutral' as const,
  target: false,
  deps: {
    neverBundle: ['react', 'react-dom'],
    dts: {
      neverBundle: ['react', 'react-dom'],
    },
  },
  inputOptions: {
    transform: {
      jsx: {
        runtime: 'classic',
        pragma: 'React.createElement',
        pragmaFrag: 'React.Fragment',
      },
    },
  },
};

export default defineConfig([
  // ESM 多入口，保留 src 目录结构
  {
    entry,
    format: 'esm',
    outDir: 'esm',
    outExtensions: () => ({ js: '.js' }),
    unbundle: true,
    dts: true,
    ...shared,
  },
  // CJS 多入口，保留 src 目录结构
  {
    entry,
    format: 'cjs',
    outDir: 'lib',
    outExtensions: () => ({ js: '.js' }),
    unbundle: true,
    dts: true,
    ...shared,
  },
  // UMD 非压缩（classnames 内联）
  {
    entry: { index: 'src/index.ts' },
    format: 'umd',
    outDir: 'dist',
    globalName: 'TDesignIconReact',
    dts: false,
    ...shared,
    deps: {
      alwaysBundle: ['classnames'],
    },
    outputOptions: (options) => {
      options.entryFileNames = 'index.js';
      options.globals = { react: 'React', 'react-dom': 'ReactDOM' };
      return options;
    },
  },
  // UMD 压缩
  {
    entry: { index: 'src/index.ts' },
    format: 'umd',
    outDir: 'dist',
    globalName: 'TDesignIconReact',
    minify: true,
    dts: false,
    ...shared,
    deps: {
      alwaysBundle: ['classnames'],
    },
    clean: false,
    outputOptions: (options) => {
      options.entryFileNames = 'index.min.js';
      options.globals = { react: 'React', 'react-dom': 'ReactDOM' };
      return options;
    },
  },
]);
