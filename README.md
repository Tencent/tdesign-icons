<p align="center">
  <a href="https://tdesign.tencent.com/" target="_blank">
    <img alt="TDesign Logo" width="200" src="https://tdesign.gtimg.com/site/TDesign.png">
  </a>
</p>

English | [简体中文](./README-zh_CN.md)

TDesign Icons is a mono-repo for 是统一生产、管理 TDesign 各框架的 Icons 组件资源的仓库。

# Resources and Packages

- [tdesign-icons-vue](./packages/vue)：TDesign Icons for Vue 2 [![npm version](https://img.shields.io/npm/v/tdesign-icons-vue.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-vue) [![NPM downloads](http://img.shields.io/npm/dm/tdesign-icons-vue.svg)](https://npmjs.org/package/tdesign-icons-vue)
- [tdesign-icons-vue-next](./packages/vue-next)：TDesign Icons for Vue 3 [![npm version](https://img.shields.io/npm/v/tdesign-icons-vue-next.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-vue-next) [![NPM downloads](http://img.shields.io/npm/dm/tdesign-icons-vue-next.svg)](https://npmjs.org/package/tdesign-icons-vue-next)
- [tdesign-icons-react](./packages/react)：TDesign Icons for React [![npm version](https://img.shields.io/npm/v/tdesign-icons-react.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-react) [![NPM downloads](http://img.shields.io/npm/dm/tdesign-icons-react.svg)](https://npmjs.org/package/tdesign-icons-react)
- [tdesign-icons-angular](./packages/angular)：TDesign Icons for Angular [![npm version](https://img.shields.io/npm/v/tdesign-icons-angular.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-angular) [![NPM downloads](http://img.shields.io/npm/dm/tdesign-icons-angular.svg)](https://npmjs.org/package/tdesign-icons-angular)
- [tdesign-icons-view](./packages/view)： Web Component Package for display TDesign Icons [![npm version](https://img.shields.io/npm/v/tdesign-icons-view.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-view) [![NPM downloads](http://img.shields.io/npm/dm/tdesign-icons-view.svg)](https://npmjs.org/package/tdesign-icons-view)
- [tdesign-icons-svg](./packages/svg)：SVG package of TDesign Icons [![npm version](https://img.shields.io/npm/v/tdesign-icons-svg.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-svg) [![NPM downloads](http://img.shields.io/npm/dm/tdesign-icons-svg.svg)](https://npmjs.org/package/tdesign-icons-svg)

# Develop Guide

you can also clone this repository/workflow to generate your own icon resource and package as well.

## Add SVG source ⛽️

please add all icon svg source file into `svg/` dir.

## Generate Resources 🏗

在根目录运行 `yarn generate`，该命令会在 `packages/` 目录下的各个子目录中生成资源文件。

更新了原始图标资源之后，请务必运行 `yarn generate` 命令。

此流程会生产发布到 CDN 的 iconfont 各字体资源、svgsprite 资源，并全量更新各框架包的单 Icon 的资源。

## Build NPM Packages 📦

进入 `packages/` 目录下的各个子目录分别执行 `yarn build` 命令以执行构建。

# License

The MIT License. Please see [the license file](./LICENSE) for more information.
