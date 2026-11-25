## TDesign Icons

TDesign Icons for Flutter.

[![Pub Version](https://img.shields.io/pub/v/tdesign_flutter_icons.svg)](https://pub.dev/packages/tdesign_flutter_icons)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Installation

Add dependency in your `pubspec.yaml`:

```yaml
dependencies:
  tdesign_flutter_icons: ^0.0.7
```

## Usage

```dart
import 'package:tdesign_flutter_icons/tdesign_flutter_icons.dart';

// Basic icon
Icon(TIcons.logo_tdesign_filled)

// With color and size
Icon(TIcons.logo_tdesign_filled, color: Colors.blue, size: 24)

// In widget tree
child: Icon(TIcons.home_filled)
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
  tdesign_flutter_icons: ^0.0.5
```

```dart
import 'package:tdesign_flutter_icons/tdesign_flutter_icons.dart';
```

## Design Guidelines

https://tdesign.tencent.com/design/icon

## License

MIT License - see [LICENSE](LICENSE) for details.
