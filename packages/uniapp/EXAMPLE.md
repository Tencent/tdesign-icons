# tdesign-icons-uniapp 示例工程

普通 uni-app 项目布局：`manifest.json`、`pages.json` 在项目根，`pages/`、`static/` 在根，
插件位于 `uni_modules/tdesign-icons-uniapp/` **真实目录**（同时是 npm 包根）。没有软链、没有 `src/`。

首页两个标签页分别演示「全量单色图标（CDN 字体）」与「多色 / 可变描边宽度（具体图标组件）」。

## 运行

在仓库根目录先安装依赖并生成图标组件：

```bash
corepack pnpm install
corepack pnpm run generate
```

然后在本目录生成图标名清单：

```bash
corepack pnpm run generate
```

用 HBuilderX 打开本目录运行；或在 Linux HBuilderX CLI 下：

```bash
cli open
cli project open --path "$PWD"
```

> 小程序端需在 `manifest.json` 里填自己的 `mp-weixin.appid`。

## 目录结构

```
.
├── manifest.json / pages.json / App.vue / main.js   # 普通项目入口
├── pages/index/index.vue                            # 演示页
├── style/multicolor.css
├── utils/demo.js
├── utils/icon-names.js                              # 生成物：图标名清单
├── static/
├── scripts/generate-icon-names.mjs                  # 生成本地图标名，不建软链
└── uni_modules/
    └── tdesign-icons-uniapp/                        # 真实插件目录 = npm 包根
        ├── package.json                             # 唯一发布清单
        ├── components/<name>-icon/<name>-icon.vue   # easycom 组件
        ├── t-icon/  style/  utils/
        └── index.uts  index.ts  manifest.ts  global-config.ts
```

## easycom 用法

`components/<name>/<name>.vue` 会被 easycom 自动扫描，页面里直接写短标签：

```vue
<close-icon :size="24" />
<abstract-icon :stroke-color="['#0052D9', '#E37318']" :stroke-width="3" />
```

`t-icon` 按 name 动态渲染，走 CDN 字体图标，需显式引入（见 `pages/index/index.vue`）。
