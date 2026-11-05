# TDesign Icons for uni-app

TDesign Icons 的 uni-app（JS 引擎版）版本，支持 **可变描边宽度** 与 **多色图标**，H5 / App / 各平台小程序共用同一套实现。

以 **uni_modules** 插件形式发布，通过 **easycom** 自动注册，页面里直接写标签即可，无需 `import`。

> 需要 uni-app x（uvue）版本请使用 [tdesign-icons-uniapp-x](../uniapp-x)。

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
                └── close.vue
```

也可以从 npm 安装：

```bash
npm i tdesign-icons-uniapp
```

## 使用

easycom 会自动扫描 `uni_modules/<id>/components/<name>/<name>.vue`，
所以页面里**直接写短标签**即可：

```vue
<template>
  <view>
    <!-- 单色图标，默认 currentColor -->
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
import { Close, Abstract } from 'tdesign-icons-uniapp';
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `string \| number` | `1em` | 图标尺寸，支持 `small` / `medium` / `large`，也支持 `20px`、`1.5em` 等 |
| `strokeColor` | `string \| string[]` | `currentColor` | 描边颜色，多色图标按顺序取用 |
| `fillColor` | `string \| string[]` | `currentColor` | 填充颜色，多色图标按顺序取用 |
| `strokeWidth` | `number` | `2` | 描边宽度 |
| `class` | `string` | - | 透传类名，组件自身会附加 `t-icon t-icon-<name>` |

组件还会透传其他属性（例如 `@click`）。

## 按需加载

easycom 只在页面实际用到某个标签时才引入对应组件文件。
实测示例小程序构建产物里，`uni_modules/tdesign-icons-uniapp/components` 下只有页面用到的 17 个图标，而不是全部 2358 个。

> 不建议全量 `import * from 'tdesign-icons-uniapp'`：入口是 2358 条 re-export，
> dev 模式下 Vite 会逐个请求全部模块，页面会长时间卡在加载中。

## 实现说明

图标会被编译成一段带占位符的 SVG 字符串，运行时替换颜色与描边宽度后编码为 `data:image/svg+xml`，交给 `<image>` 渲染。
这样 H5 / App / 小程序共用同一条渲染路径，**不需要内联 `<svg>` 标签**（小程序也不支持）。

## 平台支持

| 平台 | 支持 | 说明 |
| --- | --- | --- |
| H5 | ✅ | |
| App（vue 渲染） | ✅ | |
| 微信 / QQ / 支付宝 / 抖音 / 百度 / 快手 / 京东 / 小红书 小程序 | ✅ | QQ 可直接使用微信方案 |
| App（nvue 原生渲染页面） | ❌ | 原生渲染不支持 SVG 图片 |

> 由于通过 `<image>` 渲染，父级 `color` 不会自动生效，需要显式传 `strokeColor` / `fillColor`。

## License

MIT
