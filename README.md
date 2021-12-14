<p align="center">
  <a href="https://tdesign.tencent.com/" target="_blank">
    <img alt="TDesign Logo" width="200" src="https://tdesign.gtimg.com/site/TDesign.png">
  </a>
</p>

TDesign Icons 是统一生产、管理 TDesign 各框架的 Icons 组件资源的仓库。

# 贡献指南

## 加入原始图标 ⛽️

将原始图标放在 `svg/` 目录下。

## 图标资源生成 🏗

在根目录运行 `yarn generate`，该命令会在 `packages/` 目录下的各个子目录中生成资源文件。

更新了原始图标资源之后，请务必运行 `yarn generate` 命令。

此流程会生产发布到 CDN 的 iconfont 各字体资源、svgsprite 资源，并全量更新各框架包的单 Icon 的资源。

## 构建 NPM 包 📦

进入 `packages/` 目录下的各个子目录分别执行 `yarn build` 命令以执行构建。

# 开源协议

TDesign 遵循 [MIT 协议](https://github.com/Tencent/tdesign-icons/blob/main/LICENSE)。
