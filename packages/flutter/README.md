## TDesign Icons

TDesign Icons for Flutter.

[![Pub Version](https://img.shields.io/pub/v/tdesign_flutter_icons.svg)](https://pub.dev/packages/tdesign_flutter_icons)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Installation

Add dependency in your `pubspec.yaml`:

```yaml
dependencies:
  tdesign_flutter_icons: ^0.0.6
```

## Usage

### 1. 单色图标（iconfont 方式）

```dart
import 'package:tdesign_flutter_icons/tdesign_flutter_icons.dart';

// Basic icon
Icon(TIcons.logo_tdesign_filled)

// With color and size
Icon(TIcons.logo_tdesign_filled, color: Colors.blue, size: 24)

// In widget tree
child: Icon(TIcons.home_filled)
```

### 2. 多色 / 可变粗细 / 可变颜色图标（具名组件方式）

每个图标对应一个具名组件，命名规则为 `{图标名 PascalCase} + Icon`，
与 React 保持一致。例如 `ai` → `AiIcon`，`add-circle` → `AddCircleIcon`。

```dart
import 'package:tdesign_flutter_icons/tdesign_flutter_icons.dart';

// 多色图标：按 fill1/fill2/stroke1/stroke2 四通道分别上色
AiIcon(
  fillColor1: Colors.transparent,
  fillColor2: Colors.transparent,
  strokeColor1: Colors.blue,
  strokeColor2: Colors.green,
  strokeWidth: 2,
  size: 32,
)

// 单色使用：只传 color 即可（等效 currentColor）
AiIcon(color: Colors.blue, size: 24)

// 可变粗细 / 可变颜色：可随时动态修改 strokeWidth 与各通道颜色
AddCircleIcon(
  strokeColor1: Colors.red,
  strokeColor2: Colors.orange,
  strokeWidth: 3,
)
```

> **示例 Demo**：在 example 的「多色 / 可变粗细图标」页面中，提供**可变粗细**
> 滑杆与**可变颜色**交互（颜色操作参考 `packages/view/src/icon-view.vue`）：
> - 支持 **单色 / 双色 / 多色** 三种颜色模式切换（对齐 view 的 `colorType`）；
> - 每种模式按需展示对应颜色通道，用**自由颜色选择器（含透明度）**分别为
>   fill1 / fill2 / stroke1 / stroke2 上色，图标实时更新。
> 默认颜色与 view 保持一致（fill1 `#02d8f2`、fill2 `#ffaa75`、stroke2 `#0262f8`）。

> **品牌/logo 图标说明**：品牌（`logo-` 前缀）图标遵循「不展示修改效果」约束（对齐 view 端），
> **不支持多色 / 可变粗细**，仅支持单色（通过 `color` 参数着色）：
> ```dart
> // 品牌图标仅支持单色
> LogoGithubIcon(color: Colors.blue, size: 24)
> ```

> **半透明颜色说明**：当多个图层（fill/stroke 通道）在图标内重叠时，半透明颜色会在重叠处被混合两次而变深。
> 生成器已对存在重叠的图标自动注入 `<mask>`，避免该问题，与 React/vue 各端行为保持一致；
> 半透明色与不透明色的渲染结果均为正确效果。

## Available Icons

All icons are available as static constants in `TIcons` class (using snake_case naming):

```dart
TIcons.ability_open
TIcons.abstract
TIcons.home_filled
// ... more icons
```

Complete icon list: https://tdesign.tencent.com/icons

## Migrating from `tdesign_icons`

Replace the dependency and import with `tdesign_flutter_icons`:

```yaml
dependencies:
  tdesign_flutter_icons: ^0.0.6
```

```dart
import 'package:tdesign_flutter_icons/tdesign_flutter_icons.dart';
```

## Design Guidelines

https://tdesign.tencent.com/design/icon

## License

MIT License - see [LICENSE](LICENSE) for details.
