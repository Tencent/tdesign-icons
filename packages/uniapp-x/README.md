# TDesign Icons for uni-app x

TDesign Icons 的 uni-app x（uvue）版本，支持 **可变描边宽度** 与 **多色图标**。具体图标组件按平台差异化渲染：WEB 走内联 `<svg>`，其他端走 `<image>`。

以 **uni_modules** 插件形式发布，通过 **easycom** 自动注册，页面里直接写标签即可，无需 `import`。

> 如果项目使用的是传统 uni-app（`.vue` / JS 引擎），请使用 [tdesign-icons-uniapp](../uniapp)。

## 安装

推荐在 HBuilderX 里通过插件市场导入插件，或直接把 `tdesign-icons-uniapp-x` 目录放进项目的 `uni_modules/`：

```
your-project/
└── uni_modules/
    └── tdesign-icons-uniapp-x/
        ├── package.json
        └── components/
            ├── ability-open-icon/
            │   └── ability-open-icon.uvue
            └── close-icon/
                └── close-icon.uvue
```

也可以从 npm 安装：

```bash
npm i tdesign-icons-uniapp-x
```

> npm 包的内容就是这个插件目录本身。easycom 默认只扫描项目的 `components/` 与
> `uni_modules/*/components/`，不会扫描 `node_modules`。npm 安装后若要用 easycom 短标签，
> 请把 `node_modules/tdesign-icons-uniapp-x` 拷到项目的 `uni_modules/tdesign-icons-uniapp-x/`，
> 或在 `pages.json` 的 `easycom.custom` 中显式指向 `node_modules` 里的组件路径。

## 使用

组件为 `.uvue`，脚本使用 uts。easycom 会自动扫描 `uni_modules/<id>/components/<name>/<name>.uvue`，
所以页面里**直接写短标签**即可：

```vue
<template>
  <view>
    <!-- 单色图标，默认 currentColor -->
    <close-icon />

    <!-- 预设尺寸 -->
    <close-icon size="large" />

    <!-- 多色 + 可变描边宽度 -->
    <abstract-icon :stroke-color="['#0052D9', '#E37318']" :fill-color="['#FFB703']" :stroke-width="3" />
  </view>
</template>
```

标签名 = 目录名（`close-icon` / `ability-open-icon`），**不带 `t-` 前缀**。
CSS 类名仍是 `t-icon-<名称>`（如 `t-icon-close`），与 web 端保持一致。

如果项目自定义了 easycom 规则（`pages.json` 的 `easycom` 字段），也可以显式引入：

```vue
<script setup lang="uts">
// 导出名是 <Name>Icon（目录名 close-icon → CloseIcon）
import { CloseIcon, AbstractIcon } from '@/uni_modules/tdesign-icons-uniapp-x/index.uts'
</script>
```

## 按名称动态渲染（t-icon）

图标名来自配置、需要动态选择时，用通用组件 `t-icon`：

```vue
<template>
  <view>
    <t-icon :name="iconName" color="#0052D9" size="32px" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TIcon from '@/uni_modules/tdesign-icons-uniapp-x/t-icon/t-icon.uvue'

const iconName = ref('close')
</script>
```

`t-icon` 走**字体图标**：一套 CDN 字体（`tdesign.gtimg.com/icon/0.4.6/fonts/t.woff`，约 280KB，不进包）
+ 码点映射 `utils/icon-unicode.ts`，用 `<text>` 输出 unicode 字符。
`color` / `size` 就是 CSS 的 `color` / `font-size`，切换时不重算图标内容、不重新解码图片，全量列表也不卡。

> `t-icon` 不在 `components/` 两级目录下，easycom 不会自动注册，需显式引入。
> 它只提供 `name` / `size` / `color`（单色）；`size` 支持 `small` / `medium` / `large` 及 `24px` / `1.5em` 等任意 CSS 字号。
> 需要多色 / 可变描边宽度请用具体图标组件（如 `<abstract-icon :stroke-color="..." :stroke-width="..." />`）。

字体由 `@font-face` 从 CDN 加载（见 `style/iconfont.css`）：**小程序端需把
`https://tdesign.gtimg.com` 配到 downloadFile 合法域名**，开发者工具可关闭域名校验。
码点表从同版本 `fonts/index.css` 解析而来，请勿手动修改。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `string` | `1em` | 图标尺寸，支持 `small` / `medium` / `large`，也支持 `20px`、`1.5em` 等（带单位的字符串，数字请自己补单位） |
| `strokeColor` | `string \| string[]` | `currentColor` | 描边颜色，多色图标按顺序取用 |
| `fillColor` | `string \| string[]` | `currentColor` | 填充颜色，多色图标按顺序取用 |
| `strokeWidth` | `number` | `2` | 描边宽度 |
| `class` | `string` | - | 透传类名，组件自身会附加 `t-icon t-icon-<name>` |

组件还会透传其他属性（例如 `@click`）。

## 按需加载

easycom 只在页面实际用到某个标签时才引入对应组件文件。

> 不建议全量 `import * from 'tdesign-icons-uniapp-x'`：入口是 2358 条 re-export，编译会比较慢。

## 实现说明

两条渲染路径，其中具体图标组件按平台差异化渲染（用条件编译在构建期裁剪，不增加运行时分支）：

- **具体图标组件**（`components/<name>-icon/`）：编译成带占位符的 SVG 字符串，运行时替换颜色与描边宽度。
  - WEB：通过 `v-html` 输出原生内联 `<svg>`（uvue 的 WEB 端是完整 Vue 3，支持内联 SVG）。
  - App / 小程序 / HarmonyOS：uvue 原生渲染不支持内联 `<svg>`，仍编码为 `data:image/svg+xml` 交给 `<image>` 渲染。
  - 支持多色 / 可变描边宽度；`<image>` 路径下每个图标是一张图，大量图标同时渲染会逐张解码，不适合全量列表。
- **通用 `t-icon`**：字体图标，`<text>` 输出 unicode 字符，颜色 / 尺寸纯 CSS。单色、按 name 动态渲染，
  全量列表与频繁切换属性都轻量。

## 平台支持

| 平台 | 支持 | 具体图标组件渲染方式 |
| --- | --- | --- |
| H5 / WEB | ✅ | 内联 `<svg>` |
| App（Android / iOS） | ✅ | `<image>` + SVG data URI（需 **HBuilderX 4.81+** 保持矢量渲染） |
| 微信 / 支付宝 / 抖音 等小程序 | ✅ | `<image>` + SVG data URI |
| HarmonyOS | ⚠️ | `<image>` + SVG data URI，可能被转成位图渲染（鸿蒙 API ≥ 26 除外） |

> 未传色时各平台均按 `currentColor` 的缺省值（黑色）渲染，父级 `color` 不会生效；
> 需要改色请显式传 `strokeColor` / `fillColor`。
> 全量列表用的 `t-icon` 依赖 CDN 字体，小程序端需把 `https://tdesign.gtimg.com` 配到 downloadFile 合法域名；
> 开发者工具可关闭域名校验，字体未加载完时图标会短暂空白。

## License

MIT
