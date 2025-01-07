# CHANGELOG

## 0.3.4

### Patch Changes

- feat: 新增 logo-alipay、logo-behance-filled 等图标，修改 logo-wecom 图标，移除不合理的 logo-wecom-filled 图标

## 0.3.3

### Patch Changes

- fix: fix filled-icon naming

## 0.3.2

### Patch Changes

- fix: fix video-camera naming

## 0.3.0

### Major Changes

- feat: 新增 907 个新图标
- feat: `blockchain` 重命名改为`transform-1`,`gesture-pray-1`重命名为`gesture-open`,
  `gesture-ranslation-1`重命名为`wave-bye`, `gesture-up-1`重命名为`gesture-typing`,`gesture-up-2`重命名为`gesture-right-slip`,`logo-wechat`重命名为`logo-wechat-stroke-filled`
- feat: 移除`tree-list`、`logo-adobe-photoshop-1` 图标

## 0.2.6

### Patch Changes

- fix: fix lock-on icon path

## 0.2.5

### Patch Changes

- fix: fix umd usage

## 0.2.4

### Patch Changes

- feat: update iconfont and svgsprite address

## 0.2.3

### Patch Changes

- feat: add `list-numbered` icon, optimize path of `lock-off`;
- fix: fix `chart-column` naming;

## 0.2.2

### Patch Changes

- fix: fix icon draw path

## 0.2.1

### Patch Changes

- fix: fix evenodd fill-rule render error when transformed to iconfont

## 0.2.0

### Minor Changes

- feat: increase 900 + new icons

## 0.1.12

### Patch Changes

- fix: fix manifest effects chunk load

## 0.1.11

### Patch Changes

- add repository info

## 0.1.10

### Patch Changes

- 更名`arrow-triangle` 相关的 4 个图标

## 0.1.9

### Patch Changes

- feat: add `translate` `translate-1` `arrow-down-triangle` `arrow-down-triangle-filled` `arrow-up-triangle` `arrow-up-triangle-filled` icons

## 0.1.8 `2023-03-07`

### Features

- manifest 文件增加 path 属性

## 0.1.7 `2022-12-19`

### Features

- 新增全部图标的枚举类型

## 0.1.6 `2022-12-05`

### Features

- 新增 `minus-rectangle-filled` 图标

## 0.1.5 `2022-08-10`

### Features

- 新增`qq`、`wechat`、`wecom`、`relativity`和`pin-filled`等图标

## 0.1.4 `2022-07-20`

### Features

- 新增`image-error`图标

## 0.1.3 `2022-07-12`

### Features

- 新增`mirror`和`rotation`图标

### Bug Fixes

- 修复 iconfont 高级用法因为 t-icon 导致不显示的异常

## 0.1.2 `2022-06-24`

### Features

- 新增`rollfront`图标

## 0.1.1 `2022-05-11`

### Bug Fixes

- 修复 SSR 问题

## 0.1.0 `2022-05-09`

### Features

- 新增`file-icon`图标，优化部分图标路径

## 0.0.7 `2022-02-25`

### Bug Fixes

- 修复按需引入方式使用部分图标，由于`fillOpacity`, `fillRule`, `clipRule`属性加载异常导致的问题

## 0.0.6 `2022-01-18`

### Bug Fixes

- 修复 SSR 渲染问题
- 修复 `medium` size 渲染错误问题

## 0.0.5 `2022-01-10`

### Bug Fixes

- 修复 props 变化没有重新渲染 icon 的错误
- 移除重复添加的 class

## 0.0.4 `2021-12-21`

### Bug Fixes

- 支持 es-check es5

## 0.0.3 `2021-12-14`

### Bug Fixes

- Iconfont 默认 `size` 调整为 `undefined`，由 1em 控制当前图标大小，更满足大部分通用场景
