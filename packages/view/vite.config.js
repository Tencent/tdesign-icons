import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

import { defineConfig } from 'vite';

export default defineConfig(() => ({
  plugins: [vue(), vueJsx()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/build-entry.js'),
      name: 'td-icons-view',
      fileName: (format) => `td-icons-view.${format}.js`,
    },
  },
}));
