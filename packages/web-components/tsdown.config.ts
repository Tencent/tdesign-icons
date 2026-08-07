import {
  defineConfig,
  type DepsConfig,
  type Rolldown,
  type UserConfig,
} from 'tsdown';
import pkg from './package.json' with { type: 'json' };

const entry = ['src/**/*.ts', 'src/**/*.tsx'];

const banner = `/**
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */`;

/**
 * ESM/CJS 保留 omi、clsx 和 tailwind-merge 的包引用，避免 unbundle 产物
 * 带入包管理器内部路径。UMD 只外置 omi，工具依赖内联后可直接在浏览器使用。
 */
const unbundledDeps = {
  neverBundle: ['omi', 'clsx', 'tailwind-merge'],
  dts: {
    neverBundle: ['omi', 'clsx', 'tailwind-merge'],
  },
} satisfies DepsConfig;

const umdDeps = {
  alwaysBundle: ['clsx', 'tailwind-merge'],
  neverBundle: ['omi'],
} satisfies DepsConfig;

/**
 * omi 的 JSX 使用 `h` 工厂函数，fragment 为 `h.f`
 */
const inputOptions = {
  resolve: {
    mainFields: ['module', 'main'],
  },
  transform: {
    jsx: {
      runtime: 'classic',
      pragma: 'h',
      pragmaFrag: 'h.f',
    },
  },
} satisfies Rolldown.InputOptions;

const shared = {
  banner,
  sourcemap: true,
  clean: true,
  treeshake: false,
  platform: 'neutral',
  target: false,
  deps: unbundledDeps,
  inputOptions,
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
    copy: {
      from: ['src/iconfont/t.*', 'src/iconfont/index.css'],
      to: 'esm/iconfont',
    },
  },
  // CJS 多入口，保留 src 目录结构和入口的自定义元素注册副作用
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
    copy: {
      from: ['src/iconfont/t.*', 'src/iconfont/index.css'],
      to: 'lib/iconfont',
    },
  },
  // UMD 非压缩
  {
    entry: { index: 'src/index.ts' },
    format: 'umd',
    outDir: 'dist',
    globalName: 'TDesignIconWebComponents',
    banner,
    dts: false,
    treeshake: false,
    sourcemap: true,
    clean: true,
    platform: 'neutral' as const,
    target: false,
    deps: umdDeps,
    inputOptions,
    outputOptions: (options) => ({
      ...options,
      entryFileNames: 'index.js',
      exports: 'named',
      globals: { omi: 'omi' },
    }),
  },
  // UMD 压缩
  {
    entry: { index: 'src/index.ts' },
    format: 'umd',
    outDir: 'dist',
    globalName: 'TDesignIconWebComponents',
    banner,
    minify: true,
    dts: false,
    treeshake: false,
    sourcemap: true,
    clean: false,
    platform: 'neutral' as const,
    target: false,
    deps: umdDeps,
    inputOptions,
    outputOptions: (options) => ({
      ...options,
      entryFileNames: 'index.min.js',
      exports: 'named',
      globals: { omi: 'omi' },
    }),
  },
]);
