<p align="center">
  <a href="https://tdesign.tencent.com/" target="_blank">
    <img alt="TDesign Logo" width="200" src="https://tdesign.gtimg.com/site/TDesign.png">
  </a>
</p>

English | [简体中文](./README-zh_CN.md)

TDesign Icons is a mono-repo for TDesign Icons packages and resources management.

# Resources and Packages

- [tdesign-icons-vue](./packages/vue)：TDesign Icons for Vue 2 [![npm version](https://img.shields.io/npm/v/tdesign-icons-vue.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-vue) [![NPM downloads](http://img.shields.io/npm/dm/tdesign-icons-vue.svg)](https://npmjs.org/package/tdesign-icons-vue)
- [tdesign-icons-vue-next](./packages/vue-next)：TDesign Icons for Vue 3 [![npm version](https://img.shields.io/npm/v/tdesign-icons-vue-next.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-vue-next) [![NPM downloads](http://img.shields.io/npm/dm/tdesign-icons-vue-next.svg)](https://npmjs.org/package/tdesign-icons-vue-next)
- [tdesign-icons-react](./packages/react)：TDesign Icons for React [![npm version](https://img.shields.io/npm/v/tdesign-icons-react.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-react) [![NPM downloads](http://img.shields.io/npm/dm/tdesign-icons-react.svg)](https://npmjs.org/package/tdesign-icons-react)
- [tdesign-icons-angular](./packages/angular)：TDesign Icons for Angular [![npm version](https://img.shields.io/npm/v/tdesign-icons-angular.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-angular) [![NPM downloads](http://img.shields.io/npm/dm/tdesign-icons-angular.svg)](https://npmjs.org/package/tdesign-icons-angular)
- [tdesign-icons-view](./packages/view)： Web Component Package for display TDesign Icons [![npm version](https://img.shields.io/npm/v/tdesign-icons-view.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-view) [![NPM downloads](http://img.shields.io/npm/dm/tdesign-icons-view.svg)](https://npmjs.org/package/tdesign-icons-view)
- [tdesign-icons-svg](./packages/svg)：SVG package of TDesign Icons [![npm version](https://img.shields.io/npm/v/tdesign-icons-svg.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-svg) [![NPM downloads](http://img.shields.io/npm/dm/tdesign-icons-svg.svg)](https://npmjs.org/package/tdesign-icons-svg)

# Development Guide

TDesign Icon repository is created to manage all TDesign Icons resources and packages. Y
ou can also clone this repository to generate your own icon resource and package as well.

## Add SVG Source ⛽️

please add all icon svg source file into `svg/` dir.

## Generate Resources 🏗

execute `pnpm run generate` to update icon resource of all frameworks within `packages/` dir and the iconfont and svgsprite resource within `resources/` dir.

If you have updated the original icon resources, please execute `pnpm run generate` again.

## Update Versions and CHANGELOG 🔖

execute `npx changeset`, and choose the version number change rules for each package according to the specific situation, and fill in the content of the `CHANGELOG`.

then execute `pnpm changeset version`，the new content of `CHANGELOG` will be injected into the package.json and `CHANGELOG` of each framework package in the `packages/` directory in turn.

## Build NPM Packages 📦

execute `pnpm run --filter "tdesign-icons-*" build` to build all framework packages.

## Publish NPM Packages 🚀

execute `pnpm publish -r` to publish all framework packages.

# License

The MIT License. Please see [the license file](./LICENSE) for more information.
