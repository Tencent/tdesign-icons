import babel from '@rollup/plugin-babel';

const input = 'src/index.js';

const esmConfig = {
  input,
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  output: {
    dir: 'dist/',
    format: 'esm',
    external: ['@babel/runtime', 'tdesign-site-components'],
  },
};

export default [esmConfig];
