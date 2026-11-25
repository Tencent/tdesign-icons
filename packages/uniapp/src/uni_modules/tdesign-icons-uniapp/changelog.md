## 0.1.0

### 🌱 初始版本

- 新增 `tdesign-icons-uniapp`，支持 uni-app（Vue 2 / Vue 3）以及 H5、App、各平台小程序
- 具体图标组件按平台渲染：H5 / App 内联 `<svg>`，小程序用 `<image>` + SVG Data URI；支持可变描边宽度（`strokeWidth`）与多色图标（`strokeColor` / `fillColor` 支持字符串或数组）
- 新增通用组件 `t-icon`，按 `name` 渲染单色字体图标，适用于全量图标列表
- 以 `uni_modules` 真实目录同时发布到 npm 与 DCloud 插件市场，与 `tdesign-icons-uniapp-x` 共用同一套图标产物
