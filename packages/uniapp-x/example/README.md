# tdesign-icons-uniapp-x 示例

临时示例工程，用于验证 `tdesign-icons-uniapp-x`（uni-app x，`.uvue` + uts）的 uni_modules + easycom 用法。

## 运行

uni-app x 项目需使用 **HBuilderX 4.81+** 打开本目录（`manifest.json` 所在目录）运行：

1. 在仓库根目录执行 `corepack pnpm run generate` 生成图标组件产物；
2. 进入本目录执行 `corepack pnpm run generate` 生成图标名清单与 `uni_modules` 软链接；
3. 用 HBuilderX 打开 `packages/uniapp-x/example`；
4. 运行到浏览器（H5）、微信小程序或 App（真机）。

> 第 2 步会拉取 `https://tdesign.gtimg.com/icon/0.4.6/fonts/index.css`，
> 从 `.t-icon-<name>:before` 规则解析出 2358 个图标名写入 `src/utils/icon-names.ts`；
> 结果缓存到 `.cache/icons-0.4.6.css`，网络不可用时自动回退缓存。
> 可用 `ICONS_VERSION`（或 `pnpm run generate -- --version 0.4.7`）与 `ICONS_CSS_URL` 覆盖版本 / 数据源；
> 换版本时须同步更新 `packages/uniapp-x/src/utils/icon-unicode.ts` 与 `src/style/iconfont.css`，
> 否则名字没有对应字形。

> `example/src/uni_modules/tdesign-icons-uniapp-x` 是指向 `packages/uniapp-x/src` 的软链接。
> 如果系统/工具不支持软链接，请把 `packages/uniapp-x/src` 复制到该位置（只用于本地验证，不要提交）。

包内没有预置图标组件，全部由仓库根目录的 `pnpm run generate` 产出，因此必须先执行生成步骤。

## 目录结构

```
example/
├── scripts/generate-icon-names.mjs    # 解析 CDN CSS，生成 icon-names.ts + 建软链接
├── .cache/icons-0.4.6.css             # CSS 本地缓存（生成物）
└── src/
    ├── manifest.json
    ├── pages.json
    ├── pages/index/index.uvue
    ├── utils/
    │   └── icon-names.ts              # 生成物：ICON_NAMES
    └── uni_modules/
        └── tdesign-icons-uniapp-x/    # → packages/uniapp-x/src（软链接）
            ├── package.json           # uni_modules 元信息
            └── components/
                ├── ability-open-icon/
                │   └── ability-open-icon.uvue  # 目录名即 easycom 标签名
                └── close-icon/
                    └── close-icon.uvue
```

## 用法：easycom 短标签

easycom 会自动扫描 `uni_modules/<id>/components/<name>/<name>.uvue`，
所以页面里**直接写短标签即可**，不需要 `import`，也不需要注册 `components`：

```vue
<template>
  <view>
    <close-icon :size="24" :stroke-width="2" />
    <ability-open-icon :size="32" stroke-color="#0052D9" fill-color="#FFB703" />
  </view>
</template>
```

标签名 = 目录名（`close-icon` / `ability-open-icon`）。CSS 类名仍是 `t-icon-<名称>`（如 `t-icon-close`）。

组件属性：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `size` | `string \| number` | `small` / `medium` / `large` 或具体尺寸，如 `24px`、`24` |
| `stroke-width` | `number` | 描边宽度，默认 `2` |
| `stroke-color` | `string \| string[]` | 描边颜色，支持数组实现多色 |
| `fill-color` | `string \| string[]` | 填充颜色，支持数组实现多色 |
| `class` | `string` | 透传类名，组件自身会附加 `t-icon t-icon-<name>` |

## 按需加载

easycom 只在页面实际用到某个标签时才引入对应组件文件。小程序构建后，
`uni_modules/tdesign-icons-uniapp-x/components` 下只会出现页面用到的图标，
而不是全部 2358 个。

## 页面说明

`pages/index/index.uvue` 参考 [miniprogram-svg-icons](https://github.com/anlyyao/miniprogram-svg-icons) 的交互：

- 单色 / 双色 / 多色切换
- 描边宽度 1 ~ 3
- 尺寸：`small` / `medium` / `large` / `24px` / `32px` / `48px`

具体图标组件按平台差异化渲染：WEB 端输出原生内联 `<svg>`，App / 小程序 / 鸿蒙端走
`<image>` + SVG data URI（uvue 原生渲染不支持内联 `<svg>`，详见包 README「实现说明」）。
「全部图标」用的 `t-icon` 仍是字体图标，不受此影响。

## 注意

uni-app x 只支持 `.uvue`；传统 uni-app（Vue2 / Vue3）请使用 `packages/uniapp`（`.vue`）。
`nvue` 不在支持范围内。
