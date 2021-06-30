import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const defaults = {
  compilerOptions: {
    declaration: true,
    module: 'es2015',
  },
};

export default [
  {
    input: 'src/index.ts',
    output: {
      format: 'cjs',
      file: 'lib/index.js',
    },
    external: ['vue'],
    plugins: [
      typescript({
        tsconfigDefaults: defaults,
      }),
      vue({ template: { optimizeSSR: true } }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'esm',
      file: 'esm/index.js',
    },
    external: ['vue'],
    plugins: [
      typescript({
        tsconfigDefaults: defaults,
      }),
      vue(),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'umd',
      file: 'dist/index.js',
      name: 'library',
      sourcemap: true,
    },
    external: ['vue'],
    plugins: [
      typescript({
        tsconfigDefaults: defaults,
      }),
      vue({ template: { optimizeSSR: true } }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'umd',
      file: 'dist/index.min.js',
      name: 'library',
      sourcemap: true,
    },
    external: ['vue'],
    plugins: [
      typescript({
        tsconfigDefaults: defaults,
      }),
      vue({ template: { optimizeSSR: true } }),
      terser(),
    ],
  },
];
