import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
  plugins: [uni()],
  server: {
    // CNB 等云原生环境预览必须监听 0.0.0.0
    host: '0.0.0.0',
    port: 5175,
    // 预览域名的 Host 与本地不同，需全量放行，否则 Vite 返回 403
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
