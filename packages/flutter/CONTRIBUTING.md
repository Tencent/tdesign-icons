# TDesign Icons Flutter 贡献指南

## 环境准备

本包通过 [FVM](https://fvm.app/) 锁定 Flutter 版本，请统一使用 `fvm flutter` 执行命令。

```bash
# 安装 FVM（若尚未安装）
dart pub global activate fvm

# 在 packages/flutter 目录下安装并启用锁定版本
cd packages/flutter
fvm install
fvm use
```

版本配置见 `.fvmrc`（当前为 Flutter 3.44.1，本地开发推荐版本）。

包与 example 的 `pubspec.yaml` 最低要求为 **Flutter 3.32+ / Dart 3.8+**；CI 会在最低支持版本 **3.32.0** 和最新稳定版 Flutter 下分别验证。

---

## 本地开发调试

`example` 通过 `path: ../` 引用本地 `tdesign_icons` 包，无需发布到 pub.dev 即可实时测试。

在 monorepo 内改图标后，从**仓库根目录**按此顺序验证：

```bash
# 1. 生成各端资源
pnpm run generate

# 2. Flutter 包：安装依赖并生成 Dart 图标代码
cd packages/flutter
fvm flutter pub get
dart run tool/generate.dart

# 3. 示例应用（Android/Web）：安装依赖并运行
cd example
fvm flutter pub get
fvm flutter run
```

### 调试包源码

- example 直接加载 `packages/flutter/lib/` 源码，可在 IDE 中对 `tdesign_icons` 打断点、单步调试。
- 建议在 `packages/flutter/example` 目录下执行 `fvm flutter run`，或将该目录设为 IDE 运行根目录。
- 修改 `lib/` 内 Dart 代码：保存后 **热重载（Hot Reload）** 即可生效。
- 修改 `fonts/t.ttf` 或重新生成 `assets.g.dart` 后：需 **完全重启（Hot Restart 或重新 run）**。

---

## 发布流程

```bash
# 1. 安装依赖（仓库根目录）
pnpm install

# 2. 生成资源（仓库根目录）
pnpm run generate

# 3. 进入 Flutter 包目录
cd packages/flutter

# 4. 安装 Flutter 依赖
fvm flutter pub get

# 5. 生成代码
dart run tool/generate.dart

# 6. 代码检查
fvm flutter analyze

# 7. 更新版本号 (编辑 pubspec.yaml 和 CHANGELOG.md)

# 8. 本地预览（在 packages/flutter 目录下执行）
fvm flutter pub get
cd example && fvm flutter pub get && fvm flutter run

# 9. 提交并合并发布分支后，创建 Git Tag 触发自动发布
git tag tdesign_icons@{version}
git push origin tdesign_icons@{version}
```

---

## 项目结构

```
packages/flutter/
├── .fvmrc                   # FVM 锁定的 Flutter 版本
├── example/                 # 本地演示应用（开发调试用）
│   └── lib/
│       ├── main.dart
│       └── icon_demo_page.dart
├── fonts/
│   └── t.ttf                # 字体文件（由 gulp 构建生成）
├── lib/
│   ├── tdesign_icons.dart   # 入口文件
│   └── src/
│       └── assets.g.dart    # 图标常量（自动生成）
├── tool/
│   └── generate.dart        # 代码生成器
├── pubspec.yaml             # 包配置
├── CHANGELOG.md             # 版本记录
└── README.md                # 使用说明
```

---

## 注意事项

- 发布前需要在 pub.dev 配置 Automated publishing，仓库为 `Tencent/tdesign-icons`，Tag pattern 为 `tdesign_icons@{{version}}`
- 自动发布 workflow 会重新生成 `fonts/t.ttf` 和 `lib/src/assets.g.dart`，这两个产物不需要提交到 Git
