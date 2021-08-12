import vue from 'rollup-plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const defaults = {
  compilerOptions: {
    declaration: false,
    module: 'es2015',
  },
};

export default [
  {
    input: 'src/index.ts',
    output: {
      format: 'umd',
      file: 'dist/index.js',
      name: 'tdesignIconsVue',
      sourcemap: true,
    },
    external: ['vue'],
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfigOverride: defaults,
      }),
      vue({ template: { optimizeSSR: true } }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'umd',
      file: 'dist/index.min.js',
      name: 'tdesignIconsVue',
      sourcemap: true,
    },
    external: ['vue'],
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfigOverride: defaults,
      }),
      vue({ template: { optimizeSSR: true } }),
      terser(),
    ],
  },
];
