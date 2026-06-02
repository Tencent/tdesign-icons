# TDesign Icons Flutter 贡献指南

## 快速开始

```bash
# 1. 安装 Flutter 依赖
flutter pub get

# 2. 生成图标常量
flutter pub run tdesign_icons:generate

# 3. 代码检查
flutter analyze
```

---

## 开发流程

### 添加新图标

1. 将 SVG 文件添加到 `../../svg/` 目录
2. 在根目录执行 `pnpm run generate`
3. 执行 `flutter pub run tdesign_icons:generate`

### 更新现有图标

1. 修改 `../../svg/` 目录下的 SVG 文件
2. 在根目录执行 `pnpm run generate`
3. 执行 `flutter pub run tdesign_icons:generate`

---

## 发布流程

```bash
# 1. 生成资源
pnpm run generate  # 在根目录

# 2. 安装依赖
flutter pub get

# 3. 生成代码
flutter pub run tdesign_icons:generate

# 4. 代码检查
flutter analyze
dart format lib/

# 5. 更新版本号
# 编辑 pubspec.yaml

# 6. 发布
flutter pub publish
```

---

## 项目结构

```
packages/flutter/
├── fonts/
│   └── t.ttf          # 字体文件 (由 gulp 构建生成)
├── lib/
│   ├── tdesign_icons.dart   # 入口文件
│   └── src/
│       └── assets.g.dart    # 图标常量 (自动生成)
├── tool/
│   └── generate.dart        # 代码生成器
├── scripts/                # 脚本目录
├── pubspec.yaml            # 包配置
├── CHANGELOG.md            # 版本记录
└── README.md               # 使用说明
```

---

## 常用命令

| 命令 | 说明 |
|------|------|
| `flutter pub get` | 安装依赖 |
| `flutter pub run tdesign_icons:generate` | 生成图标常量 |
| `flutter analyze` | 代码检查 |
| `dart format lib/` | 格式化代码 |
| `flutter pub publish --dry-run` | 预览发布 |
| `flutter pub publish` | 发布到 PubDev |

---

## 注意事项

- `fonts/t.ttf` 和 `lib/src/assets.g.dart` 是**生成文件**，已加入 `.gitignore`
- 发布前确保版本号已更新
- 发布后创建 Git Tag: `git tag v{version}`
