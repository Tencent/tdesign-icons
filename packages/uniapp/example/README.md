# tdesign-icons-uniapp 示例

临时示例工程，用于验证 `tdesign-icons-uniapp`（传统 uni-app，`.vue` + JS）的 uni_modules + easycom 用法。

## 运行

在**仓库根目录**先安装依赖并生成图标：

```bash
corepack pnpm install
corepack pnpm run generate
```

然后进入本目录：

```bash
cd packages/uniapp/example

# H5（浏览器预览）
corepack pnpm run dev:h5

# 微信小程序：产物在 dist/dev/mp-weixin，用微信开发者工具打开
corepack pnpm run dev:mp-weixin

# 构建
corepack pnpm run build:h5
corepack pnpm run build:mp-weixin
```

> 小程序端需在 `src/manifest.json` 里填入你自己的 `mp-weixin.appid`。

`src/uni_modules/tdesign-icons-uniapp` 是指向 `packages/uniapp/src` 的软链接（已在 `.gitignore` 忽略）。
如果系统/工具不支持软链接，请把 `packages/uniapp/src` 复制到该位置（只用于本地验证，不要提交）。

### 在 CNB 云原生开发环境预览

`vite.config.js` 已配置：

```js
server: { host: '0.0.0.0', port: 5173, allowedHosts: true }
```

云原生环境的业务端口预览要求服务监听 `0.0.0.0`，并且请求的 Host 是 `*.cnb.run`，Vite 默认会拦截（`Blocked request. This host is not allowed.`），`allowedHosts: true` 解决的就是这个。启动后按环境变量拼出访问地址：

```bash
corepack pnpm run dev:h5
# 然后在另一终端查看可访问地址（5173 为 vite.config.js 里配置的端口）
echo "$CNB_VSCODE_PROXY_URI" | sed "s/{{port}}/5173/"
```

也可以在 WebIDE 的 PORTS 面板里直接添加端口映射。

## 页面说明

`src/pages/index/index.vue` 是一个图标预览页，参考 [miniprogram-svg-icons](https://github.com/anlyyao/miniprogram-svg-icons) 的交互：

- 单色 / 双色 / 多色切换
- 描边宽度 1 ~ 3（步长 0.5）
- 尺寸：`small` / `medium` / `large` / `24px` / `32px` / `48px`

## 用法：easycom 短标签

easycom 会自动扫描 `uni_modules/<id>/components/<name>/<name>.vue`，
所以页面里**直接写短标签即可**，不需要 `import`，也不需要注册 `components`：

```vue
<template>
  <view>
    <close-icon :size="24" :stroke-width="2" />
    <ability-open-icon :size="32" stroke-color="#0052D9" fill-color="#FFB703" />
  </view>
</template>
```

标签名 = 目录名（`close-icon` / `ability-open-icon`）。CSS 类名仍是 `t-icon-<名称>`（如 `t-icon-close`）。

> 平铺的 `components/<name>.vue` **不会**被 easycom 自动识别，必须是 `components/<name>/<name>.vue` 两级结构。

## 为什么不用全量 import

包的入口 `src/index.uts` 是 **2358 条 re-export**。在 dev 模式下（Vite 按需编译、不打包），
即使你只用到 3 个图标，浏览器也会逐个请求全部 2358 个 `.vue` 模块——
控制台会长时间停在「加载图标」，页面白屏或卡死，表现为「连接服务器超时」。

easycom 天然按需加载，只引入页面里出现的标签，所以本示例改成了短标签写法。

## 结构

```
example/
├── index.html
├── vite.config.js
└── src/
    ├── App.vue
    ├── main.js
    ├── manifest.json
    ├── pages.json
    ├── pages/index/index.vue
    ├── utils/demo.js
    └── uni_modules/
        └── tdesign-icons-uniapp/   # → packages/uniapp/src（软链接）
            ├── package.json
            └── components/
                ├── ability-open-icon/
                │   └── ability-open-icon.vue
                └── close-icon/
                    └── close.vue
```
