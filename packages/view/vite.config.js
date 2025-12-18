import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

import { defineConfig } from 'vite';

const buildMap = {
  preview: null,
  production: {
    lib: {
      entry: resolve(__dirname, 'src/build-entry.js'),
      name: 'td-icons-view',
      fileName: (format) => `td-icons-view.${format}.js`,
    },
  },
};
export default defineConfig(({ mode }) => ({
  plugins: [vue(), vueJsx()],
  build: buildMap[mode],
  server: {
    host: '0.0.0.0',
    port: 15000,
    open: '/',
    https: false,
    fs: {
      strict: false,
    },
  },
}));
