<p align="center">
  <a href="https://tdesign.tencent.com/" target="_blank">
    <img alt="TDesign Logo" width="200" src="https://tdesign.gtimg.com/site/TDesign.png">
  </a>
</p>

简体中文 | [English](./README.md)

TDesign Icons 是统一生产、管理 TDesign 各框架的 Icons 组件资源的仓库。提供超过 2000 个可变粗细、多色填充的图标的原始 SVG 和各类框架、字体、雪碧图的资源。

# 各框架图标资源

| 包名 | 框架 | 版本 | 下载量 |
|---|---|---|---|
| [tdesign-icons-vue-next](./packages/vue-next) | Vue 3 | [![npm](https://img.shields.io/npm/v/tdesign-icons-vue-next.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-vue-next) | [![npm](http://img.shields.io/npm/dm/tdesign-icons-vue-next.svg)](https://npmjs.org/package/tdesign-icons-vue-next) |
| [tdesign-icons-react](./packages/react) | React | [![npm](https://img.shields.io/npm/v/tdesign-icons-react.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-react) | [![npm](http://img.shields.io/npm/dm/tdesign-icons-react.svg)](https://npmjs.org/package/tdesign-icons-react) |
| [tdesign-icons-vue](./packages/vue) | Vue 2 | [![npm](https://img.shields.io/npm/v/tdesign-icons-vue.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-vue) | [![npm](http://img.shields.io/npm/dm/tdesign-icons-vue.svg)](https://npmjs.org/package/tdesign-icons-vue) |
| [tdesign-icons-web-components](./packages/web-components) | Web Components | [![npm](https://img.shields.io/npm/v/tdesign-icons-web-components.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-web-components) | [![npm](https://img.shields.io/npm/dm/tdesign-icons-web-components.svg)](https://www.npmjs.com/package/tdesign-icons-web-components) |
| [tdesign-icons-uniapp](./packages/uniapp/src/uni_modules/tdesign-icons-uniapp) | uni-app | — | — |
| [tdesign-icons-uniapp-x](./packages/uniapp-x/src/uni_modules/tdesign-icons-uniapp-x) | uni-app x | — | — |
| [tdesign-icons-view](./packages/view) | Web Components | [![npm](https://img.shields.io/npm/v/tdesign-icons-view.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-view) | [![npm](http://img.shields.io/npm/dm/tdesign-icons-view.svg)](https://npmjs.org/package/tdesign-icons-view) |
| [tdesign-icons-svg](./packages/svg) | SVG | [![npm](https://img.shields.io/npm/v/tdesign-icons-svg.svg?style=flat)](https://www.npmjs.com/package/tdesign-icons-svg) | [![npm](http://img.shields.io/npm/dm/tdesign-icons-svg.svg)](https://npmjs.org/package/tdesign-icons-svg) |
| [tdesign_flutter_icons](./packages/flutter) | Flutter | [![pub](https://img.shields.io/pub/v/tdesign_flutter_icons.svg?style=flat)](https://pub.dev/packages/tdesign_flutter_icons) | [![pub](https://img.shields.io/pub/dm/tdesign_flutter_icons.svg)](https://pub.dev/packages/tdesign_flutter_icons) |

# 开发指南

TDesign Icon 仓库负责生产和构建 TDesign 所有图标相关的资源和包。也可以用这个仓库构建自己的图标资源和包。开发前请确认已经安装过 pnpm 。

## 加入原始图标 ⛽️

将原始的 svg 图标资源放在 `svg/` 目录下。

## 图标资源生成 🏗

在根目录运行 `pnpm run generate`，该命令会全量更新 `packages/` 目录下的各框架包的单 Icon 的资源。同时，还会生产`resources/`目录下 iconfont 各字体资源 和 svgsprite 资源。

如果更新了原始图标资源之后，请务必运行 `pnpm run generate` 命令。

注: Flutter 除了生成 ttf 外,还需要生成对应的 dart 文件,需要本地配置了 dart 运行环境,然后执行 packages/flutter/gen_dart_file.dart 脚本,对应 dart 文件会生成在 packages/flutter/output/ 目录下

## 更新版本号及 CHANGELOG 🔖

在根目录运行 `npm run release`，根据具体情况依次选择各个包的版本号变更规则。

## 构建 NPM 包 📦

在根目录执行 `pnpm run --filter "tdesign-icons-*" build`，将构建各框架包。

## 发布 NPM 包 🚀

在根目录执行 `pnpm publish -r`，将发布所有框架的 npm 包。

## uni-app 双渠道发布 🚀

`tdesign-icons-uniapp` 与 `tdesign-icons-uniapp-x` 的发布清单位于
`packages/<包名>/src/uni_modules/<包名>/package.json`，同一目录既是 npm 包根，也是 DCloud
插件市场的 `uni_modules` 插件目录。包根是 Vite CLI 示例工程（`dev:h5` 等），CLI 项目按规范
从 `src/uni_modules/` 读取插件。

先在仓库根目录执行 `pnpm run generate`，确保 `components/`、`index.uts` 等生成物存在。

- **npm**：进入上述插件目录执行 `npm publish --access public`；
- **插件市场**：先 `cli open` 并 `cli user login` 登录作者账号，然后执行
  `cli uni_modules --publish <插件ID> --project "$PWD/packages/<包名>" --changeLog "$(cat packages/<包名>/.changelog/<版本>.md)" --json`。
  不传 `--changeLog` 时 CLI 读取插件根目录的 `changelog.md`，需自行补上当前版本内容。

插件 `package.json` 同时包含 `name`（npm）与 `id`/`dcloudext`/`uni_modules`（DCloud），
`files` 白名单同时约束两个渠道的产物；`dcloudext.npmurl` 指向对应 npm 包。
发布 CI 暂未接入，目前按上述命令手动发布。

# 开源协议

TDesign 遵循 [MIT 协议](https://github.com/Tencent/tdesign-icons/blob/main/LICENSE)。
