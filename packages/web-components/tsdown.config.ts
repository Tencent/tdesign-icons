import { defineConfig } from 'tsdown';

const entry = ['src/**/*.ts', 'src/**/*.tsx'];

/**
 * 与 rollup 时代保持一致：omi / clsx / tailwind-merge 均打进产物
 * （对外不保留运行时外部依赖），仅 omi 作为 peerDependency 保留 d.ts 外部引用。
 */
const deps = {
  alwaysBundle: ['omi', 'clsx', 'tailwind-merge', 'reactive-signal', 'weakmap-polyfill'],
  // omi 的 d.ts 为 CommonJS 语法，无法被 rolldown-plugin-dts 内联，d.ts 保留外部引用
  dts: {
    neverBundle: ['omi', 'clsx', 'tailwind-merge'],
  },
};

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
};

const shared = {
  sourcemap: true,
  clean: true,
  treeshake: false,
  platform: 'neutral' as const,
  target: false,
  deps,
  inputOptions,
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
    copy: {
      from: ['src/iconfont/t.*', 'src/iconfont/index.css'],
      to: 'esm/iconfont',
    },
  },
  // CJS 多入口，保留 src 目录结构（与 rollup 基线一致：cjs 使用默认 treeshake，入口副作用 import 被剪除）
  {
    entry,
    format: 'cjs',
    outDir: 'lib',
    outExtensions: () => ({ js: '.js' }),
    unbundle: true,
    dts: true,
    ...shared,
    treeshake: true,
    copy: {
      from: ['src/iconfont/t.*', 'src/iconfont/index.css'],
      to: 'lib/iconfont',
    },
  },
  // UMD 非压缩（与 rollup 基线一致：treeshake 开启，产出精简的入口）
  {
    entry: { index: 'src/index.ts' },
    format: 'umd',
    outDir: 'dist',
    globalName: 'TDesignIconWebComponents',
    dts: false,
    treeshake: true,
    sourcemap: true,
    clean: true,
    platform: 'neutral' as const,
    target: false,
    deps,
    inputOptions,
    outputOptions: (options) => {
      options.entryFileNames = 'index.js';
      return options;
    },
  },
  // UMD 压缩
  {
    entry: { index: 'src/index.ts' },
    format: 'umd',
    outDir: 'dist',
    globalName: 'TDesignIconWebComponents',
    minify: true,
    dts: false,
    treeshake: true,
    sourcemap: true,
    clean: false,
    platform: 'neutral' as const,
    target: false,
    deps,
    inputOptions,
    outputOptions: (options) => {
      options.entryFileNames = 'index.min.js';
      return options;
    },
  },
]);
