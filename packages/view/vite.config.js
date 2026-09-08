import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

import { defineConfig } from 'vite';

const buildMap = {
  preview: null,
  production: {
    lib: {
      entry: {
        'td-icons-view': resolve(__dirname, 'src/build-entry.js'),
        'td-icons-manifest': resolve(__dirname, 'src/manifest-entry.js'),
      },
      formats: ['es'],
      name: 'td-icons-view',
      fileName: (format, entryName) => `${entryName}.${format}.js`,
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
