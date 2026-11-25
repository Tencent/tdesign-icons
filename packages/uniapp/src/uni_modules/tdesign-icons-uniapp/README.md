# TDesign Icons for uni-app

TDesign Icons 的 uni-app（JS 引擎版）版本，支持 **可变描边宽度** 与 **多色图标**。具体图标组件按平台差异化渲染：小程序走 `<image>`，H5 / App 走内联 `<svg>`。

以 **uni_modules** 插件形式发布，通过 **easycom** 自动注册，页面里直接写标签即可，无需 `import`。

> 需要 uni-app x（uvue）版本请使用 [tdesign-icons-uniapp-x](https://github.com/Tencent/tdesign-icons/tree/develop/packages/uniapp-x)。

## 安装

推荐在 HBuilderX 里通过插件市场导入插件，或直接把 `tdesign-icons-uniapp` 目录放进项目的 `uni_modules/`：

```
your-project/
└── uni_modules/
    └── tdesign-icons-uniapp/
        ├── package.json
        └── components/
            ├── ability-open-icon/
            │   └── ability-open-icon.vue
            └── close-icon/
                └── close-icon.vue
```

也可以从 npm 安装：

```bash
npm i tdesign-icons-uniapp
```

> npm 包的内容就是这个插件目录本身。easycom 默认只扫描项目的 `components/` 与
> `uni_modules/*/components/`，不会扫描 `node_modules`。npm 安装后若要用 easycom 短标签，
> 请把 `node_modules/tdesign-icons-uniapp` 拷到项目的 `uni_modules/tdesign-icons-uniapp/`，
> 或在 `pages.json` 的 `easycom.custom` 中显式指向 `node_modules` 里的组件路径。

## 使用

easycom 会自动扫描 `uni_modules/<id>/components/<name>/<name>.vue`，
所以页面里**直接写短标签**即可：

```vue
<template>
  <view>
    <!-- 单色图标，默认黑色，不继承父级 color -->
    <close-icon />

    <!-- 预设尺寸 -->
    <close-icon size="large" />

    <!-- 自定义尺寸 -->
    <close-icon size="20px" />

    <!-- 多色 + 可变描边宽度 -->
    <abstract-icon :stroke-color="['#0052D9', '#E37318']" :fill-color="['#FFB703']" :stroke-width="3" />
  </view>
</template>
```

标签名 = 目录名（`close-icon` / `ability-open-icon`），**不带 `t-` 前缀**。
CSS 类名仍是 `t-icon-<名称>`（如 `t-icon-close`），与 web 端保持一致。

如果项目自定义了 easycom 规则（`pages.json` 的 `easycom` 字段），也可以显式引入：

```js
import { CloseIcon, AbstractIcon, TIcon } from '@/uni_modules/tdesign-icons-uniapp/index.uts';
```

导出名是 `<Name>Icon`（目录名 `close-icon` → `CloseIcon`），与 `manifest` 里的 `icon` 字段一致。

## 按名称动态渲染（t-icon）

图标名来自配置、需要动态选择时，用通用组件 `t-icon`。它和具体图标组件一样位于 `components/` 下，
由 easycom 自动注册，**直接写标签即可**：

```vue
<template>
  <view>
    <t-icon :name="iconName" color="#0052D9" size="32px" />
  </view>
</template>

<script>
export default {
  data() {
    return { iconName: 'close' };
  },
};
</script>
```

`t-icon` 走**字体图标**：一套 CDN 字体（`tdesign.gtimg.com/icon/0.4.6/fonts/t.woff`，约 280KB，不进小程序包）
+ 码点映射 `utils/icon-unicode.js`，用 `<text>` 直接输出 unicode 字符。
`color` / `size` 就是 CSS 的 `color` / `font-size`，切换时**不重算图标内容、不重新解码图片**，全量图标列表也不卡。

> 点击以 `click` 事件抛出：`<t-icon name="close" @click="onClick" />`。
> 它只提供 `name` / `size` / `color`（单色、描边宽度固定）；
> 需要多色 / 可变描边宽度请用具体图标组件（如 `<abstract-icon :stroke-color="..." :stroke-width="..." />`）。
> 小程序端不支持 `<component :is>`，动态图标名与精细样式控制刻意走两条路径。

字体由 `@font-face` 从 CDN 加载（见 `style/iconfont.css`）：**小程序端需把
`https://tdesign.gtimg.com` 配到 downloadFile 合法域名**，开发者工具可关闭域名校验。
码点表从同版本 `fonts/index.css` 解析而来，请勿手动修改。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `string` | `1em` | 图标尺寸，支持 `small` / `medium` / `large`，也支持 `20px`、`1.5em` 等（带单位的字符串，数字请自己补单位） |
| `strokeColor` | `string \| string[]` | `#000000` | 描边颜色，多色图标按顺序取用 |
| `fillColor` | `string \| string[]` | `#000000` | 填充颜色，多色图标按顺序取用 |
| `strokeWidth` | `number` | `2` | 描边宽度 |
| `class` | `string` | - | 透传类名，组件自身会附加 `t-icon t-icon-<name>` |

点击以 `click` 事件抛出，Vue 2 / Vue 3 写法一致：

```vue
<close-icon @click="onClick" />
```

其余非 prop 属性会透传到根节点。

## 按需加载

easycom 只在页面实际用到某个标签时才引入对应组件文件。
示例工程的「多色 / 可变」标签页只用到 12 个具体图标组件，构建产物里就只有这 12 个，而不是全部 2358 个；
「全部图标」标签页用通用 `t-icon` 字体图标覆盖全量单色图标——一套 CDN 字体 + 码点表即可，
不需要把 2358 个组件打进产物。

> 不建议全量 `import * from 'tdesign-icons-uniapp'`：入口是 2359 条 re-export，
> dev 模式下 Vite 会逐个请求全部模块，页面会长时间卡在加载中。

## 实现说明

两条渲染路径，其中具体图标组件按平台差异化渲染（用条件编译在构建期裁剪，不增加运行时分支）：

- **具体图标组件**（`components/<name>-icon/`）：编译成带占位符的 SVG 字符串，运行时替换颜色与描边宽度。
  - 小程序：编码为 `data:image/svg+xml`，交给 `<image>` 渲染（小程序不支持内联 `<svg>`）。
  - H5 / App：通过 `v-html` 输出原生内联 `<svg>`，无图片解码、描边与颜色走真实 SVG DOM。
  - 支持多色 / 可变描边宽度。小程序端每个图标仍是一张图，大量图标同时渲染会逐张解码，不适合全量列表。
- **通用 `t-icon`**：字体图标，`<text>` 输出 unicode 字符，颜色 / 尺寸纯 CSS。单色、按 name 动态渲染，
  全量列表与频繁切换属性都轻量。

## 平台支持

| 平台 | 支持 | 具体图标组件渲染方式 |
| --- | --- | --- |
| H5 | ✅ | 内联 `<svg>` |
| App（vue 渲染） | ✅ | 内联 `<svg>` |
| 微信 / QQ / 支付宝 / 抖音 / 百度 / 快手 / 京东 / 小红书 小程序 | ✅ | `<image>` + SVG data URI（QQ 可直接使用微信方案） |
| App（nvue 原生渲染页面） | ❌ | 原生渲染不支持 SVG 图片 |

> 未传色时固定渲染为黑色，不继承父级 `color`（与小程序端 `<image>` 的渲染结果保持一致）；
> 需要改色请显式传 `strokeColor` / `fillColor`。

## License

MIT
