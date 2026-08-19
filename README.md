<p align="center">
  <a href="https://tdesign.tencent.com/" target="_blank">
    <img alt="TDesign Logo" width="200" src="https://tdesign.gtimg.com/site/TDesign.png">
  </a>
</p>

English | [简体中文](./README-zh_CN.md)

TDesign Icons is a mono-repo for TDesign Icons packages and resources management. TDesign Icons provides over 2,000 icons with variable stroke widths and multi-color fills, available as raw SVGs and resources for various frameworks, fonts, and sprite sheets.

# Resources and Packages

| Package | Framework | Version | Downloads |
|---|---|---|---|
| [tdesign-icons-vue-next](./packages/vue-next) | Vue 3 | [![npm](https://img.shields.io/npm/v/tdesign-icons-vue-next.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-vue-next) | [![npm](http://img.shields.io/npm/dm/tdesign-icons-vue-next.svg)](https://npmjs.org/package/tdesign-icons-vue-next) |
| [tdesign-icons-react](./packages/react) | React | [![npm](https://img.shields.io/npm/v/tdesign-icons-react.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-react) | [![npm](http://img.shields.io/npm/dm/tdesign-icons-react.svg)](https://npmjs.org/package/tdesign-icons-react) |
| [tdesign-icons-vue](./packages/vue) | Vue 2 | [![npm](https://img.shields.io/npm/v/tdesign-icons-vue.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-vue) | [![npm](http://img.shields.io/npm/dm/tdesign-icons-vue.svg)](https://npmjs.org/package/tdesign-icons-vue) |
| [tdesign-icons-web-components](./packages/web-components) | Web Components | [![npm](https://img.shields.io/npm/v/tdesign-icons-web-components.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-web-components) | [![npm](https://img.shields.io/npm/dm/tdesign-icons-web-components.svg)](https://www.npmjs.com/package/tdesign-icons-web-components) |
| [tdesign-icons-view](./packages/view) | Web Components | [![npm](https://img.shields.io/npm/v/tdesign-icons-view.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-view) | [![npm](http://img.shields.io/npm/dm/tdesign-icons-view.svg)](https://npmjs.org/package/tdesign-icons-view) |
| [tdesign-icons-svg](./packages/svg) | SVG | [![npm](https://img.shields.io/npm/v/tdesign-icons-svg.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-svg) | [![npm](http://img.shields.io/npm/dm/tdesign-icons-svg.svg)](https://npmjs.org/package/tdesign-icons-svg) |
| [tdesign_flutter_icons](./packages/flutter) | Flutter | [![pub](https://img.shields.io/pub/v/tdesign_flutter_icons.svg?style=flat)](https://pub.dev/packages/tdesign_flutter_icons) | [![pub](https://img.shields.io/pub/dm/tdesign_flutter_icons.svg)](https://pub.dev/packages/tdesign_flutter_icons) |

# Development Guide

TDesign Icon repository is created to manage all TDesign Icons resources and packages. You can also clone this repository to generate your own icon resources and packages as well.

## Add SVG Source Files ⛽️

please add all icon svg source file into `svg/` dir.

## Generate Resources 🏗

execute `pnpm run generate` to update icon resource of all frameworks within `packages/` dir and the iconfont and svgsprite resource within `resources/` dir.

If you have updated the original icon resources, please execute `pnpm run generate` again.

## Update Versions and CHANGELOG 🔖

execute `npm run release`, and choose the version number change rules for each package according to the specific situation.

## Build NPM Packages 📦

execute `pnpm run --filter "tdesign-icons-*" build` to build all framework packages.

## Publish NPM Packages 🚀

execute `pnpm publish -r` to publish all framework packages.

# License

The MIT License. Please see [the license file](./LICENSE) for more information.
