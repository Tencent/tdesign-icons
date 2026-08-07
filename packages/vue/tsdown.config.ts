import { defineConfig, type TsdownHooks, type UserConfig } from 'tsdown';
import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import pkg from './package.json' with { type: 'json' };

const entry = ['src/**/*.ts', 'src/**/*.tsx'];

const banner = `/**
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */`;

/**
 * src/style/css.ts 是组件统一引用的样式入口。ESM 保留
 * `import "./index.css"`，交给前端构建工具处理；CJS 则只提取
 * style/index.css，不应在运行时 require CSS，否则原生 Node 会将 CSS
 * 当作 JavaScript 解析并报错。
 *
 * Rollup 时代通过 ignoreImport 生成空的 style/css.js。Rolldown 会为
 * CSS 入口生成 require 调用，因此构建后将该 JS 占位文件清空，以保持
 * 模块路径兼容。真实样式文件 style/index.css 与声明文件仍会保留。
 */
function fixCjsCss(): Partial<TsdownHooks> {
  return {
    'build:done': ({ options }) => {
      const cssFile = join(options.outDir, 'style', 'css.js');
      if (existsSync(cssFile)) writeFileSync(cssFile, '');
    },
  };
}

const shared = {
  banner,
  sourcemap: true,
  clean: true,
  treeshake: false,
  platform: 'neutral',
  target: false,
  deps: {
    neverBundle: ['vue', 'classnames'],
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
    css: {
      fileName: 'style/index.css',
      splitting: true,
      inject: true,
    },
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
    hooks: fixCjsCss(),
    outputOptions: {
      exports: 'named',
    },
    css: {
      fileName: 'style/index.css',
      splitting: true,
      inject: false,
    },
  },
  // UMD 非压缩
  {
    entry: { index: 'src/index.ts' },
    format: 'umd',
    outDir: 'dist',
    globalName: 'TDesignIconVue',
    dts: false,
    ...shared,
    deps: {
      alwaysBundle: ['classnames'],
      neverBundle: ['vue'],
    },
    outputOptions: (options) => ({
      ...options,
      entryFileNames: 'index.js',
      exports: 'named',
      globals: { vue: 'Vue' },
    }),
    css: {
      fileName: 'index.css',
      splitting: false,
      inject: false,
    },
  },
  // UMD 压缩
  {
    entry: { index: 'src/index.ts' },
    format: 'umd',
    outDir: 'dist',
    globalName: 'TDesignIconVue',
    minify: true,
    dts: false,
    ...shared,
    deps: {
      alwaysBundle: ['classnames'],
      neverBundle: ['vue'],
    },
    clean: false,
    outputOptions: (options) => ({
      ...options,
      entryFileNames: 'index.min.js',
      exports: 'named',
      globals: { vue: 'Vue' },
    }),
    css: {
      fileName: 'index.min.css',
      splitting: false,
      inject: false,
      minify: true,
    },
  },
]);
