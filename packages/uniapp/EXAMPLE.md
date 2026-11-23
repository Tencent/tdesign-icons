# tdesign-icons-uniapp 示例工程

Vite CLI 工程（`package.json` 里有 `dev:h5` 等 `@dcloudio` 脚本，`vite.config.js` 在包根）。
示例源码在 `src/`，插件在 `src/uni_modules/tdesign-icons-uniapp/` **真实目录**——这和
[wot-design-uni](https://github.com/Moonofweisheng/wot-design-uni) 的结构一致：一份插件目录
既能在 CLI 工程里开发/调试，也能原样发布到 npm 和 DCloud 插件市场供 HBuilderX 工程导入。

## 运行

在仓库根目录：

```bash
corepack pnpm install
corepack pnpm run generate
```

进入本目录：

```bash
corepack pnpm run generate   # 生成 src/utils/icon-names.js
corepack pnpm dev:h5
corepack pnpm dev:mp-weixin
corepack pnpm build:h5
```

> 小程序端需在 `src/manifest.json` 里填自己的 `mp-weixin.appid`。

## 目录结构

```
.
├── package.json / vite.config.js / index.html   # Vite CLI 工程入口
├── src/
│   ├── App.vue / main.js / manifest.json / pages.json
│   ├── pages/index/index.vue                    # 演示页
│   ├── style/multicolor.css
│   ├── utils/demo.js
│   ├── utils/icon-names.js                      # 生成物
│   ├── static/
│   └── uni_modules/
│       └── tdesign-icons-uniapp/                # 真实插件目录 = npm 包根
│           ├── package.json                     # 唯一发布清单（name + id + dcloudext）
│           ├── components/<name>-icon/<name>-icon.vue
│           ├── t-icon/  style/  utils/
│           └── index.uts  index.ts  manifest.ts  global-config.ts
├── scripts/generate-icon-names.mjs              # 只生成图标名，不建软链
└── gulp/  .changelog/
```

## CLI 与 HBuilderX 双模式

- **CLI 工程**：插件放在 `src/uni_modules/tdesign-icons-uniapp/`，easycom 自动扫描组件，直接用短标签。
- **HBuilderX 工程**：从 DCloud 插件市场导入，插件落到项目根的 `uni_modules/tdesign-icons-uniapp/`。
- **npm 安装**：包内容就是插件目录本身；easycom 默认不扫 `node_modules`，需拷到
  `uni_modules/` 或在 `pages.json` 配 `easycom.custom`（见包 `README.md`）。
