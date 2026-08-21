import fs from 'fs';
import path from 'path';

/**
 * Flutter 图标生成聚合逻辑（TS 实现）。
 *
 * 原 `tool/generate.dart` 的三个生成步骤，全部用 TS 复刻，从而不再需要
 * Dart / `code_builder` / `dart_style` 等依赖：
 *
 * 1. `generateIconFontAssets` — 生成 `lib/src/assets.g.dart`（iconfont 字体
 *    IconData 常量），并复制 `resources/icon-font/dist/t.ttf` 到 `fonts/t.ttf`；
 * 2. `generateSvgData` — 聚合 gulp 管线生成的 per-icon SVG 数据
 *    （`tool/generated/svg/*.dart`）为 `lib/src/svg_data.g.dart`；
 * 3. `generateNamedIcons` — 生成 `lib/src/icons.g.dart`（具名图标组件，
 *    如 AiIcon / AddCircleIcon）。
 */

const fontFamily = 'TIcons';
const fontPackage = 'tdesign_flutter_icons';

const header = 'TDesign Icons for Flutter\n'
  + '// GENERATED CODE - DO NOT MODIFY BY HAND\n'
  + '// ignore_for_file: constant_identifier_names, unused_element, '
  + 'prefer_const_constructors_in_immutables, library_private_types_in_public_api';

// packages/flutter 目录绝对路径
const flutterDir = path.resolve(__dirname, '..');

// ================================================================
// 1. iconfont 资产生成
// ================================================================

interface IconModel {
  originalName: string;
  name: string;
  codepoint: string;
}

/** `resources/icon-font/dist/index.json` 中的单个图标条目。 */
interface RawIconModel {
  name: string;
  codepoint: string;
}

function parseIconModel(raw: RawIconModel): IconModel {
  const originalName = raw.name;
  const name = originalName.replace(/-/g, '_');
  const codepoint = raw.codepoint.replace(/\\/g, '');

  if (!/^[A-Fa-f0-9]{4,6}$/.test(codepoint)) {
    throw new Error(
      `Invalid codepoint format: \\${codepoint} for icon name: ${name}. `
      + 'Expected format: \\E001',
    );
  }

  return { originalName, name, codepoint };
}

/** 复制 iconfont 字体文件并返回 icon 列表。 */
function readIconFont(): IconModel[] {
  const indexPath = path.resolve(
    flutterDir, '../../resources/icon-font/dist/index.json',
  );
  const fontPath = path.resolve(
    flutterDir, '../../resources/icon-font/dist/t.ttf',
  );

  if (!fs.existsSync(indexPath)) {
    throw new Error(`Index file not found at: ${indexPath}`);
  }
  if (!fs.existsSync(fontPath)) {
    throw new Error(`Font file not found at: ${fontPath}`);
  }

  const fontDestDir = path.join(flutterDir, 'fonts');
  fs.mkdirSync(fontDestDir, { recursive: true });
  fs.copyFileSync(fontPath, path.join(fontDestDir, 't.ttf'));

  const indexJson = JSON.parse(
    fs.readFileSync(indexPath, 'utf-8'),
  ) as { icons: RawIconModel[] };
  const icons = indexJson.icons.map(parseIconModel);

  return icons;
}

/** 生成 `lib/src/assets.g.dart`（iconfont 常量映射）。 */
function generateIconFontAssets(icons: IconModel[]): void {
  const lines: string[] = [];
  lines.push(`// ${header}`);
  lines.push('');
  lines.push("import 'package:flutter/widgets.dart';");
  lines.push('');

  const indent = '  ';
  lines.push('/// @formatter:off');
  lines.push(
    '/// TDesign icon collection. Use with [Icon] widget, e.g. [TIcons.home_filled].',
  );
  // Tree Shaking 支持
  lines.push('@staticIconProvider');
  lines.push(`abstract final class ${fontFamily} {`);
  lines.push(`${indent}static const String iconFont = '${fontFamily}';`);
  lines.push(`${indent}static const String iconFontPackage = '${fontPackage}';`);
  lines.push('');

  icons.forEach((icon) => {
    const hex = parseInt(icon.codepoint, 16);
    lines.push(`${indent}/// "${fontFamily}" named "${icon.originalName}". `);
    lines.push(
      `${indent}static const IconData ${icon.name} = IconData(0x${hex.toString(16)},`
      + ' fontFamily: iconFont, fontPackage: iconFontPackage);',
    );
  });
  lines.push('');

  // allIconsMap
  lines.push(`${indent}/// "${fontFamily}" all icons. `);
  lines.push(`${indent}static const Map<String, IconData> allIconsMap = {`);
  icons.forEach((icon) => {
    lines.push(`${indent}${indent}'${icon.name}': ${icon.name},`);
  });
  lines.push(`${indent}};`);
  lines.push('}');
  lines.push('');

  const code = `// dart format off\n${lines.join('\n')}\n// dart format on\n`;

  const outputDir = path.join(flutterDir, 'lib/src');
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'assets.g.dart'), code);
}

// ================================================================
// 2. 聚合 gulp 管线生成的 per-icon SVG 数据
// ================================================================

/** 将字符串转义为 Dart 多行字符串字面量（仅需转义反斜杠与美元符）。 */
function escapeDartString(input: string): string {
  return input.replace(/\\/g, '\\\\').replace(/\$/g, '\\$');
}

/** 读取 `tool/generated/svg/*.dart`，返回「图标名 → SVG 数据」映射。 */
function collectGeneratedSvgData(): Map<string, string> {
  const generatedDir = path.join(flutterDir, 'tool/generated/svg');
  if (!fs.existsSync(generatedDir)) {
    throw new Error(
      `Generated SVG data dir not found: ${generatedDir}. `
      + 'Run `pnpm run generate` (gulp flutterTask) first.',
    );
  }

  const result = new Map<string, string>();
  const files = fs
    .readdirSync(generatedDir)
    .filter((f) => f.endsWith('.dart'))
    .sort((a, b) => a.localeCompare(b));

  files.forEach((file) => {
    const content = fs.readFileSync(path.join(generatedDir, file), 'utf-8');
    const nameMatch = /^\/\/ name:\s*(.+)$/m.exec(content);
    const svgMatch = /r'''([\s\S]*?)'''/m.exec(content);
    if (!nameMatch || !svgMatch) {
      throw new Error(`Unexpected generated file format: ${file}`);
    }
    result.set(nameMatch[1].trim(), svgMatch[1]);
  });

  if (result.size === 0) {
    throw new Error(`No generated SVG data found under: ${generatedDir}`);
  }

  return result;
}

/** 生成 `lib/src/svg_data.g.dart`。 */
function generateSvgData(svgDataMap: Map<string, string>): void {
  const outputDir = path.join(flutterDir, 'lib/src');
  fs.mkdirSync(outputDir, { recursive: true });

  const lines: string[] = [];
  lines.push(`// ${header}`);
  lines.push('');
  lines.push('/// 所有图标的 SVG 数据（已预处理颜色占位符）。');
  lines.push('const Map<String, String> svgDataMap = {');

  const sortedEntries = Array.from(svgDataMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  sortedEntries.forEach(([key, value]) => {
    const escaped = escapeDartString(value);
    lines.push(`  '${key}': '''${escaped}''',`);
  });

  lines.push('};');
  lines.push('');

  fs.writeFileSync(path.join(outputDir, 'svg_data.g.dart'), `${lines.join('\n')}`);
}

// ================================================================
// 3. 生成具名图标组件 icons.g.dart
// ================================================================

/** 将图标名转为 PascalCase 组件名（如 'ai-1' → 'Ai1Icon'）。
 * 与原 `tool/generate.dart` 的 `_toComponentName` 保持一致：
 * 按 `-` / `_` 拆分后逐段首字母大写（注意 `3d`/`4k`/`cinema4d` 等
 * 保持小写，与 camelcase 库的 `3D`/`4K` 行为不同）。 */
function toComponentName(iconName: string): string {
  const parts = iconName.split(/[-_]/);
  const camel = parts
    .filter((p) => p.length > 0)
    .map((p) => p[0].toUpperCase() + p.substring(1))
    .join('');
  return `${camel}Icon`;
}

/** 生成单个图标组件类的 Dart 代码。 */
function generateIconClass(iconName: string, svgKey: string): string {
  const className = toComponentName(iconName);

  // 品牌/logo 图标遵循「不展示修改效果」约束（对齐 view 端）：
  // 生成单色组件，不暴露 fill/stroke 多色通道与可变 strokeWidth，
  // 颜色统一走 `color`（其 SVG 数据中已无多色占位符，仅保留 __COLOR__）。
  if (iconName.startsWith('logo-')) {
    return `/// TDesign 图标「${iconName}」。
///
/// 品牌图标遵循「不展示修改效果」约束，仅支持单色（[color]）。
class ${className} extends StatelessWidget {
  const ${className}({
    super.key,
    this.size,
    this.color,
  });

  /// 图标尺寸（宽高）。
  final double? size;

  /// 图标颜色（单色）。
  final Color? color;

  @override
  Widget build(BuildContext context) {
    return TDIconBase(
      svgData: svgDataMap['${svgKey}']!,
      size: size,
      color: color,
    );
  }
}
`;
  }

  return `/// TDesign 图标「${iconName}」。
///
/// 多色/可变粗细图标组件，支持 fillColor1/fillColor2/strokeColor1/strokeColor2/strokeWidth。
class ${className} extends StatelessWidget {
  const ${className}({
    super.key,
    this.size,
    this.color,
    this.fillColor1,
    this.fillColor2,
    this.strokeColor1,
    this.strokeColor2,
    this.strokeWidth = 2,
  });

  /// 图标尺寸（宽高）。
  final double? size;

  /// 单色图标颜色（等效 currentColor），也是多色通道的默认回退色。
  final Color? color;

  /// fill 通道 1 颜色。
  final Color? fillColor1;

  /// fill 通道 2 颜色。
  final Color? fillColor2;

  /// stroke 通道 1 颜色。
  final Color? strokeColor1;

  /// stroke 通道 2 颜色。
  final Color? strokeColor2;

  /// 描边宽度，默认 2.0。
  final double strokeWidth;

  @override
  Widget build(BuildContext context) {
    return TDIconBase(
      svgData: svgDataMap['${svgKey}']!,
      size: size,
      color: color,
      fillColor1: fillColor1,
      fillColor2: fillColor2,
      strokeColor1: strokeColor1,
      strokeColor2: strokeColor2,
      strokeWidth: strokeWidth,
    );
  }
}
`;
}

/** 生成 `lib/src/icons.g.dart`。 */
function generateNamedIcons(svgDataMap: Map<string, string>): void {
  const outputDir = path.join(flutterDir, 'lib/src');
  fs.mkdirSync(outputDir, { recursive: true });

  const lines: string[] = [];
  lines.push(`// ${header}`);
  lines.push('');
  lines.push("import 'package:flutter/widgets.dart';");
  lines.push("import 'icon_base.dart';");
  lines.push("import 'svg_data.g.dart';");
  lines.push('');

  const sortedKeys = Array.from(svgDataMap.keys()).sort();
  sortedKeys.forEach((key) => {
    lines.push(generateIconClass(key, key));
  });

  fs.writeFileSync(path.join(outputDir, 'icons.g.dart'), `${lines.join('\n')}`);
}

// ================================================================
// 入口
// ================================================================

/** 执行全部 Flutter 聚合步骤（替代 `dart run tool/generate.dart`）。 */
export function aggregateFlutterIcons(): void {
  // 1. iconfont 资产生成（复制字体 + assets.g.dart）
  const icons = readIconFont();
  generateIconFontAssets(icons);

  // 2. 聚合 gulp 管线生成的 per-icon SVG 数据
  const svgDataMap = collectGeneratedSvgData();
  generateSvgData(svgDataMap);
  generateNamedIcons(svgDataMap);
}
