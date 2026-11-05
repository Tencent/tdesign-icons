# TDesign Icons for uni-app x

TDesign Icons 的 uni-app x（uvue）版本，支持 **可变描边宽度** 与 **多色图标**，H5 / App / 各平台小程序共用同一套实现。

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
                └── close.uvue
```

也可以从 npm 安装：

```bash
npm i tdesign-icons-uniapp-x
```

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
import { Close, Abstract } from '@/uni_modules/tdesign-icons-uniapp-x/index.uts'
</script>
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

> 不建议全量 `import * from 'tdesign-icons-uniapp-x'`：入口是 2358 条 re-export，编译会比较慢。

## 实现说明

uvue 不支持内联 `<svg>` 标签，因此图标会被编译成一段带占位符的 SVG 字符串，运行时替换颜色与描边宽度后编码为 `data:image/svg+xml`，交给 `<image>` 渲染。

## 平台支持

| 平台 | 支持 | 说明 |
| --- | --- | --- |
| H5 | ✅ | |
| App（Android / iOS） | ✅ | 需要 **HBuilderX 4.81+**（`<image>` 支持 SVG 格式），保持矢量渲染 |
| 微信 / 支付宝 / 抖音 等小程序 | ✅ | |
| HarmonyOS | ⚠️ | 可用，但 `data:image/svg+xml` 会被转成位图渲染（鸿蒙 API ≥ 26 除外） |

> 由于通过 `<image>` 渲染，父级 `color` 不会自动生效，需要显式传 `strokeColor` / `fillColor`。

## License

MIT
