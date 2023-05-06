<p align="center">
  <a href="https://tdesign.tencent.com/" target="_blank">
    <img alt="TDesign Logo" width="200" src="https://tdesign.gtimg.com/site/TDesign.png">
  </a>
</p>

简体中文 | [English](./README.md)

TDesign Icons 是统一生产、管理 TDesign 各框架的 Icons 组件资源的仓库。

# 各框架图标资源

- [tdesign-icons-vue](./packages/vue)：适用于 Vue2 的 TDesign 图标 [![npm version](https://img.shields.io/npm/v/tdesign-icons-vue.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-vue) [![NPM downloads](http://img.shields.io/npm/dm/tdesign-icons-vue.svg)](https://npmjs.org/package/tdesign-icons-vue)
- [tdesign-icons-vue-next](./packages/vue-next)：适用于 Vue3 的 TDesign 图标 [![npm version](https://img.shields.io/npm/v/tdesign-icons-vue-next.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-vue-next) [![NPM downloads](http://img.shields.io/npm/dm/tdesign-icons-vue-next.svg)](https://npmjs.org/package/tdesign-icons-vue-next)
- [tdesign-icons-react](./packages/react)：适用于 React 的 TDesign 图标 [![npm version](https://img.shields.io/npm/v/tdesign-icons-react.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-react) [![NPM downloads](http://img.shields.io/npm/dm/tdesign-icons-react.svg)](https://npmjs.org/package/tdesign-icons-react)
- [tdesign-icons-angular](./packages/angular)：适用于 Angular 的 TDesign 图标 [![npm version](https://img.shields.io/npm/v/tdesign-icons-angular.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-angular) [![NPM downloads](http://img.shields.io/npm/dm/tdesign-icons-angular.svg)](https://npmjs.org/package/tdesign-icons-angular)
- [tdesign-icons-view](./packages/view)：跨框架展示 TDesign 全量图标的 Web Component [![npm version](https://img.shields.io/npm/v/tdesign-icons-view.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-view) [![NPM downloads](http://img.shields.io/npm/dm/tdesign-icons-view.svg)](https://npmjs.org/package/tdesign-icons-view)
- [tdesign-icons-svg](./packages/svg)：纯 SVG 的 TDesign 图标 [![npm version](https://img.shields.io/npm/v/tdesign-icons-svg.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-svg) [![NPM downloads](http://img.shields.io/npm/dm/tdesign-icons-svg.svg)](https://npmjs.org/package/tdesign-icons-svg)

# 开发指南

TDesign Icon 仓库负责生产和构建 TDesign 所有图标相关的资源和包。也可以用这个仓库构建自己的图标资源和包。开发前请确认已经安装过 pnpm 。

## 加入原始图标 ⛽️

将原始的 svg 图标资源放在 `svg/` 目录下。

## 图标资源生成 🏗

在根目录运行 `pnpm run generate`，该命令会全量更新 `packages/` 目录下的各框架包的单 Icon 的资源。同时，还会生产`resources/`目录下 iconfont 各字体资源 和 svgsprite 资源。

如果更新了原始图标资源之后，请务必运行 `pnpm run generate` 命令。

## 更新版本号及 CHANGELOG 🔖

在根目录运行 `npx changeset`，根据具体情况依次选择各个包的版本号变更规则，并填下 `CHANGELOG`的内容。

再执行 `pnpm changeset version`，CHANGELOG 的内容将依次注入到 `packages/` 内各个框架包的 `package.json` 及`CHANGELOG` 中。

## 构建 NPM 包 📦

在根目录执行 `pnpm run --filter "tdesign-icons-*" build`，将构建各框架包。

## 发布 NPM 包 🚀

在根目录执行 `pnpm publish -r`，将发布所有框架的 npm 包。

# 开源协议

TDesign 遵循 [MIT 协议](https://github.com/Tencent/tdesign-icons/blob/main/LICENSE)。
