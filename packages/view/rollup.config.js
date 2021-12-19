// import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

const input = 'src/index.js';

const cjsConfig = {
  input,
  plugins: [
    commonjs(),
    // babel({ babelHelpers: 'runtime' }),
  ],
  output: {
    dir: 'dist/',
    format: 'cjs',
    sourcemap: true,
    exports: 'named',
  },
};

export default [cjsConfig];
