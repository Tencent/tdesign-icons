# tdesign-icons-uniapp-x 示例工程

普通 uni-app x 项目布局：`manifest.json`、`pages.json` 在项目根，`pages/`、`static/` 在根，
插件位于 `uni_modules/tdesign-icons-uniapp-x/` **真实目录**（同时是 npm 包根）。没有软链、没有 `src/`。

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

用 HBuilderX（4.81+）打开本目录运行；或在 Linux HBuilderX CLI 下：

```bash
cli open
cli project open --path "$PWD"
```

> 换 CDN 字体版本时须同步更新插件内 `utils/icon-unicode.ts` 与 `style/iconfont.css`。
> 小程序端需在 `manifest.json` 里填自己的 `mp-weixin.appid`。

## 目录结构

```
.
├── manifest.json / pages.json / App.uvue / main.uts  # 普通项目入口
├── pages/index/index.uvue                            # 演示页
├── style/multicolor.css
├── shims.d.ts / tsconfig.json
├── utils/demo.ts
├── utils/icon-names.ts                              # 生成物：图标名清单
├── static/
├── scripts/generate-icon-names.mjs                  # 生成本地图标名，不建软链
└── uni_modules/
    └── tdesign-icons-uniapp-x/                      # 真实插件目录 = npm 包根
        ├── package.json                             # 唯一发布清单
        ├── components/<name>-icon/<name>-icon.uvue  # easycom 组件
        ├── t-icon/  style/  utils/
        └── index.uts  index.ts  manifest.ts  global-config.ts
```

## easycom 用法

`components/<name>/<name>.uvue` 会被 easycom 自动扫描，页面里直接写短标签：

```vue
<close-icon :size="24" />
<abstract-icon :stroke-color="['#0052D9', '#E37318']" :stroke-width="3" />
```
