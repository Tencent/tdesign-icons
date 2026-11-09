# tdesign-icons-uniapp 示例

临时示例工程，用于验证 `tdesign-icons-uniapp`（传统 uni-app，`.vue` + JS）的 uni_modules + easycom 用法。
首页用**两个标签页**分别演示「全量单色图标」与「多色 / 可变描边宽度」。

## 运行

在**仓库根目录**先安装依赖并生成具体图标组件（多色示例用到）：

```bash
corepack pnpm install
corepack pnpm run generate
```

然后进入本目录，生成图标名清单与 uni_modules 软链接（会拉取固定版本的 CDN 字体 CSS）：

```bash
cd packages/uniapp/example
corepack pnpm run generate

# H5（浏览器预览）
corepack pnpm run dev:h5

# 微信小程序：产物在 dist/dev/mp-weixin，用微信开发者工具打开
corepack pnpm run dev:mp-weixin

# 构建
corepack pnpm run build:h5
corepack pnpm run build:mp-weixin

# 抖音小程序：产物在 dist/build/mp-toutiao，用抖音开发者工具打开
corepack pnpm run build:mp-toutiao
```

> 小程序端需在 `src/manifest.json` 里填入你自己的 `mp-weixin.appid`。

`corepack pnpm run generate` 会做两件事：

- 从 `https://tdesign.gtimg.com/icon/0.4.6/fonts/index.css` 解析 `.t-icon-<name>:before` 规则，
  生成 `src/utils/icon-names.js`；结果缓存到 `.cache/icons-0.4.6.css`，网络不可用时自动回退缓存。
  可用 `ICONS_VERSION`（或 `pnpm run generate -- --version 0.4.7`）与 `ICONS_CSS_URL` 覆盖版本 / 数据源；
  换版本时须同步更新包内 `ICON_UNICODE` 码点表和 `@font-face` 的字体版本，否则名字没有对应字形。
- 创建 `src/uni_modules/tdesign-icons-uniapp` 软链接，指向 `packages/uniapp/src`（已 `.gitignore`）。
  如果系统/工具不支持软链接，请把 `packages/uniapp/src` 复制到该位置（只用于本地验证，不要提交）。

具体图标组件的 SVG / 渲染实现有更新时，重跑仓库根目录的 `pnpm run generate`；
图标**集合**随 CDN 字体版本增减时重跑本目录的 `pnpm run generate`（刷新 `icon-names.js`）。
全量列表用的是固定版本的 CDN 字体 + 码点表，不随本地 SVG 变化。

### 在 CNB 云原生开发环境预览

`vite.config.js` 已配置：

```js
server: { host: '0.0.0.0', port: 5173, allowedHosts: true }
```

云原生环境的业务端口预览要求服务监听 `0.0.0.0`，并且请求的 Host 是 `*.cnb.run`，Vite 默认会拦截（`Blocked request. This host is not allowed.`），`allowedHosts: true` 解决的就是这个。启动后按环境变量拼出访问地址：

```bash
corepack pnpm run dev:h5
# 然后在另一终端查看可访问地址（5173 为 vite.config.js 里配置的端口）
echo "$CNB_VSCODE_PROXY_URI" | sed "s/{{port}}/5173/"
```

也可以在 WebIDE 的 PORTS 面板里直接添加端口映射。

## 页面说明

全站只有 1 个页面（`pages/index/index`），用顶部两个标签切换。

### 标签一：全部图标（CDN 字体）

- 用包内通用组件 `t-icon` 走**字体图标**：一套 CDN 字体 + 码点映射，`<text>` 输出 unicode 字符做**单色**渲染，
  一个组件覆盖全量 2358 个图标；
- 可切换图标颜色、尺寸，支持按名称搜索；切换只改 CSS（`color` / `font-size`），
  **不重算图标内容、不重新解码图片**；
- 首屏分批渲染 60 个，滚动到底或点「加载更多」继续，也可一键「加载全部」；
- 图标名清单来自同版本 `fonts/index.css` 的 `.t-icon-<name>:before` 规则，与码点表一一对应。

> 字体由 `@font-face` 从 `https://tdesign.gtimg.com/icon/0.4.6/fonts/t.woff` 加载，不进小程序包。
> 小程序端需在开发者后台把 `https://tdesign.gtimg.com` 配到 **downloadFile 合法域名**；
> 开发者工具可勾选「不校验合法域名」直接预览。字体未加载完成时图标会短暂空白。

#### 为什么不用 `<image>` 渲染 SVG

早期版本把每个图标编码成 `data:image/svg+xml` 交给 `<image>` 渲染：2355 个图标就是 2355 张图片要解码，
切换颜色时所有 src 全部重编码并 setData（约 2.4MB），小程序端明显卡顿。
现在与 [tdesign-miniprogram 的 uniapp icon](https://github.com/Tencent/tdesign-miniprogram/blob/develop/packages/uniapp-components/icon/icon.vue)
思路一致：一套字体只加载一次、图标是文本字符、属性切换零成本。

### 标签二：多色 / 可变

- 用具体图标组件（`<ability-open-icon />` 等）演示 `strokeColor` / `fillColor` / `strokeWidth`；
- 可切换单色 / 双色 / 多色、描边宽度 1 ~ 3（步长 0.5）、尺寸 `small` / `medium` / `large` / `24px` / `32px` / `48px`；
- **4 个色位（f1/f2/s1/s2）都能改颜色**：小程序端没有 color-picker，改用预设色块，点击即改；
  按模式只显示生效的色位（单色 1 个、双色 2 个、多色 4 个），与 view 里颜色选择器的显示规则一致。
- **只挑 6 个带多色位的代表性图标**。多色 / 可变描边由每个图标各自的组件提供，把全量组件打进包里
  会带来明显的体积与渲染开销；全量图标请切到标签一用 `t-icon` 单色查看。

配色逻辑与 [packages/view 的 icon-view.vue](https://github.com/Tencent/tdesign-icons/blob/develop/packages/view/src/icon-view.vue) 对齐：
图标模板有 4 个颜色位（填充 `f1`/`f2`、描边 `s1`/`s2`），数组顺序恒为 `[第 1 色位, 第 2 色位]`，主色在前。

| 模式 | strokeColor / fillColor | 效果 |
| --- | --- | --- |
| 单色 | 单值，填充 `transparent` | 只描边，1 色 |
| 双色 | 长度 2，第 2 色位跟随第 1 色位 | 填充一色 + 描边一色，2 色 |
| 多色 | 长度 2，4 个色位各自独立 | 最多 4 色 |

约 6 成图标只有 `f1`/`s1` 单色位，第 2 色位不存在，因此双色 / 多色在这类图标上只体现第 1 色位；
view 里同样是按图标风格（`outline` / `outlineFilled`）绑定可用的颜色模式。

约 6 成图标只有 `{f1}` / `{s1}` 单色位，`resolveColors` 特意让三种模式在**第一个颜色位**就不同
（单色同色 / 蓝+黄 / 橙+粉），因此对任何图标切换模式都可见。部分品牌图标没有 `{sw}` 占位符，
拖动描边宽度对它们不会变化。

## 用法一：具体图标组件（easycom 短标签）

easycom 会自动扫描 `uni_modules/<id>/components/<name>/<name>.vue`，
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

> 平铺的 `components/<name>.vue` **不会**被 easycom 自动识别，必须是 `components/<name>/<name>.vue` 两级结构。

## 用法二：t-icon（按名称动态渲染）

`t-icon` 不在 `components/` 两级目录下，easycom 不会自动注册，需要显式引入：

```vue
<template>
  <view>
    <t-icon :name="iconName" color="#0052D9" size="32px" />
  </view>
</template>

<script>
// 示例首页用的是相对路径，业务项目也可用 @/uni_modules/...
import TIcon from '../../uni_modules/tdesign-icons-uniapp/t-icon/t-icon.vue';

export default {
  components: { TIcon },
  data() {
    return { iconName: 'close' };
  },
};
</script>
```

`t-icon` 只做单色（`name` / `size` / `color`）；多色与可变描边宽度请用具体图标组件。
`size` 支持 `small` / `medium` / `large` 及 `24px` / `1.5em` 等任意 CSS 字号。
小程序端不支持 `<component :is>`，因此「动态图标名」与「精细样式控制」刻意走两条路径。

## 为什么不用全量 import

包的入口 `src/index.uts` 是 **2358 条 re-export**。在 dev 模式下（Vite 按需编译、不打包），
即使你只用到 3 个图标，浏览器也会逐个请求全部 2358 个 `.vue` 模块——
控制台会长时间停在「加载图标」，页面白屏或卡死，表现为「连接服务器超时」。

easycom 天然按需加载，只引入页面里出现的标签；而全量列表用通用 `t-icon`（字体图标）+ 一份码点表即可，
不需要引入 2358 个组件，也不需要 2.4MB 的 SVG 模板表。

## 结构

```
example/
├── index.html
├── vite.config.js
├── package.json
├── scripts/generate-icon-names.mjs   # 解析 CDN CSS，生成 icon-names.js + 建软链接
├── .cache/icons-0.4.6.css            # CSS 本地缓存（生成物）
└── src/
    ├── App.vue
    ├── main.js
    ├── manifest.json
    ├── pages.json                   # 1 个页面
    ├── pages/index/index.vue        # 两个标签页
    ├── style/multicolor.css         # 页面共用样式
    ├── utils/
    │   ├── demo.js                  # 配色 / 尺寸 / 精选图标名单
    │   └── icon-names.js            # 生成物：ICON_NAMES
    └── uni_modules/
        └── tdesign-icons-uniapp/    # → packages/uniapp/src（软链接）
            ├── style/iconfont.css   # @font-face：CDN 字体
            ├── utils/icon-unicode.js # 图标名 -> 字体码点（2358 条）
            ├── t-icon/t-icon.vue    # 字体图标，单色、按 name 动态渲染
            ├── icon-map.js          # 可选生成物：全量 SVG 模板表，示例不引用
            └── components/          # 具体图标组件（easycom，多色 / 可变）
```
