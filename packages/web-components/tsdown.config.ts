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
 * unbundle 模式下 alwaysBundle 不会真正内联源码，而是产出 node_modules/.pnpm/... 相对路径——
 * 发布到 npm 后无法解析。因此 clsx / tailwind-merge 也走 external，由 dependencies 保证运行时解析。
 * reactive-signal / weakmap-polyfill 是 omi 的传递依赖且未列在 dependencies 中，仍需内嵌；
 * 若它们也出现 .pnpm 路径残留，需将它们也 external 化或改由 dependencies 显式声明。
 */
const deps = {
  alwaysBundle: ['reactive-signal', 'weakmap-polyfill'],
  external: ['omi', 'clsx', 'tailwind-merge'],
  dts: {
    neverBundle: ['omi', 'clsx', 'tailwind-merge'],
  },
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
  deps,
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
    banner,
    dts: false,
    treeshake: true,
    sourcemap: true,
    clean: true,
    platform: 'neutral' as const,
    target: false,
    deps,
    inputOptions,
    outputOptions: (options) => ({
      ...options,
      entryFileNames: 'index.js',
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
    treeshake: true,
    sourcemap: true,
    clean: false,
    platform: 'neutral' as const,
    target: false,
    deps,
    inputOptions,
    outputOptions: (options) => ({
      ...options,
      entryFileNames: 'index.min.js',
    }),
  },
]);
