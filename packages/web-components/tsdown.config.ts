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
 * omi 是 peerDependency，运行时由宿主提供（与官方包一致，从 node_modules/omi 解析），
 * 不内嵌进产物，避免发布后 esm/node_modules/ 依赖 files 通配覆盖的隐患。
 * clsx / tailwind-merge / reactive-signal / weakmap-polyfill 无 peer 约定，仍打进产物。
 */
const deps = {
  alwaysBundle: ['clsx', 'tailwind-merge', 'reactive-signal', 'weakmap-polyfill'],
  // omi 作为 external 不被打包；其 d.ts 为 CommonJS 语法，无法被 rolldown-plugin-dts 内联，d.ts 保留外部引用
  external: ['omi'],
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
