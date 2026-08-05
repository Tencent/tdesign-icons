import { defineConfig } from 'tsdown';
import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const entry = ['src/**/*.ts', 'src/**/*.tsx'];

const shared = {
  sourcemap: true,
  clean: true,
  treeshake: false,
  platform: 'neutral' as const,
  target: false,
  deps: {
    neverBundle: ['vue'],
  },
};

/**
 * CJS 产物中 style/css.ts 会被 rolldown 输出为 `require("./index.cjs")`，
 * 与 rollup 时代通过 `ignoreImport` 产物（空 css.js）不一致，这里在构建后清空该文件。
 */
function fixCjsCss() {
  return {
    'build:done': ({ options }: { options: { outDir: string } }) => {
      const cssFile = join(options.outDir, 'style', 'css.js');
      if (existsSync(cssFile)) writeFileSync(cssFile, '');
    },
  };
}

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
    globalName: 'TDesignIconVueNext',
    dts: false,
    ...shared,
    clean: false,
    outputOptions: (options) => {
      options.entryFileNames = 'index.js';
      options.globals = { vue: 'Vue' };
      return options;
    },
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
    globalName: 'TDesignIconVueNext',
    minify: true,
    dts: false,
    ...shared,
    clean: false,
    outputOptions: (options) => {
      options.entryFileNames = 'index.min.js';
      options.globals = { vue: 'Vue' };
      return options;
    },
    css: {
      fileName: 'index.min.css',
      splitting: false,
      inject: false,
      minify: true,
    },
  },
]);
