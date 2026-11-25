import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
  plugins: [uni()],
  server: {
    // 监听 0.0.0.0，云原生环境（CNB 等）的业务端口预览必须如此，
    // 启动在 localhost / 127.0.0.1 上无法从外部访问
    host: '0.0.0.0',
    // 固定端口，便于按 CNB_VSCODE_PROXY_URI 拼出预览地址
    port: 5173,
    // 预览域名形如 https://<随机串>-<端口>.cnb.run，Host 与本地不同，
    // 需全量放行，否则 Vite 会返回 "Blocked request. This host is not allowed."
    allowedHosts: true,
  },
  // h5 产物同样可能需要部署到非预期的域名下，避免构建期注入的 Host 校验
  preview: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
