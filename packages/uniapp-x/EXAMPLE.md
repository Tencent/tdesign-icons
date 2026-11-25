# tdesign-icons-uniapp-x 示例工程

Vite CLI 工程（`package.json` 里有 `dev:h5` 等 `@dcloudio` 脚本，`vite.config.js` 在包根），
示例源码在 `src/`，插件在 `src/uni_modules/tdesign-icons-uniapp-x/` **真实目录**。

## 运行

在仓库根目录：

```bash
corepack pnpm install
corepack pnpm run generate
```

进入本目录：

```bash
corepack pnpm run generate   # 生成 src/utils/icon-names.ts
corepack pnpm dev:h5
corepack pnpm dev:mp-weixin
corepack pnpm build:h5
```

> 换 CDN 字体版本时须同步更新插件内 `utils/icon-unicode.ts` 与 `style/iconfont.css`。
> 小程序端需在 `src/manifest.json` 里填自己的 `mp-weixin.appid`。

## 目录结构

```
.
├── package.json / vite.config.js / index.html / shims.d.ts / tsconfig.json
├── src/
│   ├── App.uvue / main.uts / manifest.json / pages.json
│   ├── pages/index/index.uvue                   # 演示页
│   ├── style/multicolor.css
│   ├── utils/demo.ts
│   ├── utils/icon-names.ts                      # 生成物
│   ├── static/
│   └── uni_modules/
│       └── tdesign-icons-uniapp-x/              # 真实插件目录 = npm 包根
│           ├── package.json                     # 唯一发布清单（name + id + dcloudext）
│           ├── README.md  LICENSE  changelog.md # 插件的文档、协议、更新日志都在这里
│           ├── components/<name>-icon/<name>-icon.uvue  # 生成物，模板在 gulp/template/icon.uvue
│           ├── components/t-icon/t-icon.uvue             # 生成物，通用字体图标，模板在 gulp/template/t-icon.uvue
│           ├── style/  utils/
│           └── index.uts  index.ts  manifest.ts  global-config.ts
├── scripts/generate-icon-names.mjs              # 只生成图标名，不建软链
└── gulp/  .changelog/
```

## CLI 与 HBuilderX 双模式

- **CLI 工程**：插件放在 `src/uni_modules/tdesign-icons-uniapp-x/`，easycom 自动扫描组件。
- **HBuilderX 工程**：从 DCloud 插件市场导入，插件落到项目根的 `uni_modules/tdesign-icons-uniapp-x/`。
- **npm 安装**：easycom 默认不扫 `node_modules`，需拷到 `uni_modules/` 或配
  `pages.json` 的 `easycom.custom`（见包 `README.md`）。
