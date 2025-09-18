import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import multiInput from 'rollup-plugin-multi-input';
import postcss from 'rollup-plugin-postcss';
import esbuild from 'rollup-plugin-esbuild';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';

const extensions = ['.ts', '.tsx'];

const external = ['react', 'react-dom', '@babel/runtime'];

const input = 'src/index.ts';
const inputList = ['src/**/*.ts', 'src/**/*.tsx'];

const getPlugins = ({ isProd = false, isUmd = false } = {}) => {
  const plugins = [
    nodeResolve({ extensions }),
    commonjs(),
    esbuild({
      include: /\.tsx?$/,
      target: 'esnext',
      minify: false,
      loader: 'tsx',
      jsxFactory: 'h',
      jsxFragment: 'h.f',
    }),
    json(),
    babel({ babelHelpers: 'runtime', extensions }),
  ];

  if (isProd) {
    plugins.push(
      terser({
        output: {
          ascii_only: true,
        },
      }),
    );
  }

  if (isUmd) {
    plugins.push(
      postcss({
        extract: isProd ? 'index.min.css' : 'index.css',
        minimize: isProd,
        sourceMap: true,
      }),
    );
  } else {
    plugins.push(copy({
      targets: [
        { src: 'src/iconfont/t.*', dest: 'esm/iconfont' },
        { src: 'src/iconfont/t.*', dest: 'lib/iconfont' },
        { src: 'src/iconfont/index.css', dest: 'esm/iconfont' },
        { src: 'src/iconfont/index.css', dest: 'lib/iconfont' },
      ],
    }));
  }

  return plugins;
};

const esmConfig = {
  input: inputList,
  treeshake: false,
  external,
  plugins: [multiInput()].concat(getPlugins({ isEsm: true })),
  output: {
    dir: 'esm/',
    format: 'esm',
    sourcemap: true,
    chunkFileNames: '_chunks/dep-[hash].js',
  },
};

const cjsConfig = {
  input: inputList,
  external,
  plugins: [multiInput()].concat(getPlugins()),
  output: {
    dir: 'lib/',
    format: 'cjs',
    sourcemap: true,
    exports: 'named',
    chunkFileNames: '_chunks/dep-[hash].js',
  },
};

const umdConfig = {
  input,
  external,
  plugins: getPlugins({ isUmd: true }),
  output: {
    name: 'TDesignIconWebComponents',
    format: 'umd',
    exports: 'named',
    globals: { omi: 'omi' },
    sourcemap: true,
    file: 'dist/index.js',
  },
};

const umdMinConfig = {
  input,
  external,
  plugins: getPlugins({
    isProd: true,
    isUmd: true,
  }),
  output: {
    name: 'TDesignIconWebComponents',
    format: 'umd',
    exports: 'named',
    globals: { omi: 'omi' },
    sourcemap: true,
    file: 'dist/index.min.js',
  },
};

export default [
  esmConfig,
  cjsConfig,
  umdConfig,
  umdMinConfig,
];
