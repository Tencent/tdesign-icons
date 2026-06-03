# TDesign Icons Flutter 贡献指南

## 发布流程

```bash
# 1. 安装依赖
pnpm install

# 2. 生成资源
pnpm run generate  # 在根目录

# 3. 进入 Flutter 包目录
cd packages/flutter

# 4. 安装 Flutter 依赖
flutter pub get

# 5. 生成代码
dart run tool/generate.dart

# 6. 代码检查
flutter analyze

# 7. 更新版本号 (编辑 pubspec.yaml)

# 8. 发布
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
├── pubspec.yaml            # 包配置
├── CHANGELOG.md            # 版本记录
└── README.md               # 使用说明
```

---

## 注意事项

- 发布后创建 Git Tag: `git tag v{version}`
