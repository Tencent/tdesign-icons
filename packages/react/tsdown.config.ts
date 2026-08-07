import { defineConfig, type UserConfig } from 'tsdown';
import pkg from './package.json' with { type: 'json' };

const entry = ['src/**/*.ts', 'src/**/*.tsx'];

const banner = `/**
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */`;

/**
 * ESM/CJS 保留框架和运行时依赖的包引用；UMD 只外置 React，
 * classnames 内联后可直接配合页面中的 React 全局变量使用。
 */
const shared = {
  sourcemap: true,
  clean: true,
  treeshake: false,
  platform: 'neutral',
  target: false,
  deps: {
    neverBundle: ['react', 'react-dom', 'classnames'],
    dts: {
      neverBundle: ['react', 'react-dom', 'classnames'],
    },
  },
  // tsconfig 保留 JSX；发布构建统一转换为兼容旧产物的 React classic 调用。
  inputOptions: {
    transform: {
      jsx: {
        runtime: 'classic',
        pragma: 'React.createElement',
        pragmaFrag: 'React.Fragment',
      },
    },
  },
} satisfies UserConfig;

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
    outputOptions: {
      exports: 'named',
    },
  },
  // UMD 非压缩（classnames 内联）
  {
    entry: { index: 'src/index.ts' },
    format: 'umd',
    outDir: 'dist',
    globalName: 'TDesignIconReact',
    banner,
    dts: false,
    ...shared,
    deps: {
      alwaysBundle: ['classnames'],
      neverBundle: ['react', 'react-dom'],
    },
    outputOptions: {
      entryFileNames: 'index.js',
      exports: 'named',
      globals: { react: 'React', 'react-dom': 'ReactDOM' },
    },
  },
  // UMD 压缩
  {
    entry: { index: 'src/index.ts' },
    format: 'umd',
    outDir: 'dist',
    globalName: 'TDesignIconReact',
    banner,
    minify: true,
    dts: false,
    ...shared,
    deps: {
      alwaysBundle: ['classnames'],
      neverBundle: ['react', 'react-dom'],
    },
    clean: false,
    outputOptions: {
      entryFileNames: 'index.min.js',
      exports: 'named',
      globals: { react: 'React', 'react-dom': 'ReactDOM' },
    },
  },
]);
