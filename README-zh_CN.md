<p align="center">
  <a href="https://tdesign.tencent.com/" target="_blank">
    <img alt="TDesign Logo" width="200" src="https://tdesign.gtimg.com/site/TDesign.png">
  </a>
</p>

简体中文 | [English](./README.md)

TDesign Icons 是统一生产、管理 TDesign 各框架的 Icons 组件资源的仓库。

# 各框架图标资源

| 包名 | 框架 | 版本 | 下载量 |
|---|---|---|---|
| [tdesign-icons-vue-next](./packages/vue-next) | Vue 3 | [![npm](https://img.shields.io/npm/v/tdesign-icons-vue-next.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-vue-next) | [![npm](http://img.shields.io/npm/dm/tdesign-icons-vue-next.svg)](https://npmjs.org/package/tdesign-icons-vue-next) |
| [tdesign-icons-vue](./packages/vue) | Vue 2 | [![npm](https://img.shields.io/npm/v/tdesign-icons-vue.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-vue) | [![npm](http://img.shields.io/npm/dm/tdesign-icons-vue.svg)](https://npmjs.org/package/tdesign-icons-vue) |
| [tdesign-icons-react](./packages/react) | React | [![npm](https://img.shields.io/npm/v/tdesign-icons-react.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-react) | [![npm](http://img.shields.io/npm/dm/tdesign-icons-react.svg)](https://npmjs.org/package/tdesign-icons-react) |
| [tdesign-icons-web-components](./packages/web-components) | Web Components | [![npm](https://img.shields.io/npm/v/tdesign-icons-web-components.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-web-components) | [![npm](https://img.shields.io/npm/dm/tdesign-icons-web-components.svg)](https://www.npmjs.com/package/tdesign-icons-web-components) |
| [tdesign-icons-view](./packages/view) | Web Components | [![npm](https://img.shields.io/npm/v/tdesign-icons-view.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-view) | [![npm](http://img.shields.io/npm/dm/tdesign-icons-view.svg)](https://npmjs.org/package/tdesign-icons-view) |
| [tdesign-icons-svg](./packages/svg) | SVG | [![npm](https://img.shields.io/npm/v/tdesign-icons-svg.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-svg) | [![npm](http://img.shields.io/npm/dm/tdesign-icons-svg.svg)](https://npmjs.org/package/tdesign-icons-svg) |
| [tdesign_flutter_icons](./packages/flutter) | Flutter | [![pub](https://img.shields.io/pub/v/tdesign_flutter_icons.svg?style=flat)](https://pub.dev/packages/tdesign_flutter_icons) | [![pub](https://img.shields.io/pub/likes/tdesign_flutter_icons.svg)](https://pub.dev/packages/tdesign_flutter_icons) |

# 开发指南

TDesign Icon 仓库负责生产和构建 TDesign 所有图标相关的资源和包。也可以用这个仓库构建自己的图标资源和包。开发前请确认已经安装过 pnpm 。

## 加入原始图标 ⛽️

将原始的 svg 图标资源放在 `svg/` 目录下。

## 图标资源生成 🏗

在根目录运行 `pnpm run generate`，该命令会全量更新 `packages/` 目录下的各框架包的单 Icon 的资源。同时，还会生产`resources/`目录下 iconfont 各字体资源 和 svgsprite 资源。

如果更新了原始图标资源之后，请务必运行 `pnpm run generate` 命令。

注:flutter除了生成ttf外,还需要生成对应的dart文件,需要本地配置了dart运行环境,然后执行packages/flutter/gen_dart_file.dart脚本,对应dart文件会生成在packages/flutter/output/目录下

## 更新版本号及 CHANGELOG 🔖

在根目录运行 `npx changeset`，根据具体情况依次选择各个包的版本号变更规则，并填下 `CHANGELOG`的内容。

再执行 `pnpm changeset version`，CHANGELOG 的内容将依次注入到 `packages/` 内各个框架包的 `package.json` 及`CHANGELOG` 中。

## 构建 NPM 包 📦

在根目录执行 `pnpm run --filter "tdesign-icons-*" build`，将构建各框架包。

## 发布 NPM 包 🚀

在根目录执行 `pnpm publish -r`，将发布所有框架的 npm 包。

# 开源协议

TDesign 遵循 [MIT 协议](https://github.com/Tencent/tdesign-icons/blob/main/LICENSE)。
