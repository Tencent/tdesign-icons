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

### 2. 多色 / 可变粗细图标（具名组件方式）

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

// 可变粗细
AddCircleIcon(
  strokeColor1: Colors.red,
  strokeColor2: Colors.orange,
  strokeWidth: 3,
)
```

### 3. 使用基础组件

也可以直接使用 `TDIconBase` 基础组件（需要手动提供 SVG 数据）：

```dart
import 'package:tdesign_flutter_icons/tdesign_flutter_icons.dart';

TDIconBase(
  svgData: svgDataMap['ai']!,
  fillColor1: Colors.transparent,
  strokeColor1: Colors.blue,
  strokeWidth: 2,
)
```

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
