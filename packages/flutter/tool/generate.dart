import 'dart:convert';
import 'dart:io';

import 'package:code_builder/code_builder.dart';
import 'package:dart_style/dart_style.dart';
import 'package:xml/xml.dart';

const fontFamily = 'TIcons';
const fontPackage = 'tdesign_flutter_icons';

/// 特殊的图标，需要用描边方式处理填充（与 gulp/util/const.ts 保持一致）。
const specifiedIcons = <String>{
  'caret-up-small',
  'caret-down-small',
  'caret-left-small',
  'caret-right-small',
  'drag-drop',
  'loading',
  'logo-alipay',
  'logo-behance',
  'logo-cnb',
  'logo-ie',
  'logo-stackblitz',
  'logo-wechat-stroke',
  'logo-wechatpay',
  'logo-wecom',
  'logo-tbeacon',
  'logo-xiaomareport',
  'logo-hiflow',
  'logo-wechat-workdocs',
  'logo-tencentmeeting',
  'logo-tapd',
  'logo-tencentcode',
  'logo-codesign',
  'logo-tdesign',
  'pause',
  'pause-circle',
  'play',
  'play-circle',
  'stop',
  'stop-circle',
  'summary',
};

const colorChannelIds = <String>{
  'fill1',
  'fill2',
  'stroke1',
  'stroke2',
};

const header = '''TDesign Icons for Flutter
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: constant_identifier_names, unused_element, prefer_const_constructors_in_immutables, library_private_types_in_public_api''';

void main() {
  final scriptDir = File.fromUri(Platform.script).parent.path;

  // ---- 1. 生成 iconfont 资产（原有逻辑） ----
  final indexPath = '$scriptDir/../../../resources/icon-font/dist/index.json';
  final fontPath = '$scriptDir/../../../resources/icon-font/dist/t.ttf';

  final indexFile = File(indexPath);
  if (!indexFile.existsSync()) {
    throw Exception('Index file not found at: ${indexFile.path}');
  }

  final fontFile = File(fontPath);
  if (!fontFile.existsSync()) {
    throw Exception('Font file not found at: ${fontFile.path}');
  }

  final fontDestFile = File('$scriptDir/../fonts/t.ttf');
  fontDestFile.parent.createSync(recursive: true);
  fontFile.copySync(fontDestFile.path);

  final indexJsonString = indexFile.readAsStringSync();

  List<IconModel> icons = json
      .decode(indexJsonString)['icons']
      .map<IconModel>(
        (item) => IconModel.fromJson(item as Map<String, dynamic>),
      )
      .toList();

  generateIconFont(icons);

  // ---- 2. 生成 SVG 数据（多色 / 可变粗细） ----
  final svgDir = '$scriptDir/../../../svg';
  final svgFiles = Directory(svgDir)
      .listSync()
      .whereType<File>()
      .where((f) => f.path.endsWith('.svg'))
      .toList()
    ..sort((a, b) => a.path.compareTo(b.path));

  final svgDataMap = <String, String>{};
  for (final file in svgFiles) {
    final iconName = file.uri.pathSegments.last.replaceAll('.svg', '');
    final svgContent = file.readAsStringSync();
    svgDataMap[iconName] = processSvg(svgContent, iconName);
  }

  generateSvgData(svgDataMap);
  generateNamedIcons(svgDataMap);
}

// ================================================================
// 1. iconfont 资产生成（原有逻辑，仅重命名）
// ================================================================

void generateIconFont(List<IconModel> icons) {
  final scriptDir = File.fromUri(Platform.script).parent.path;
  final library = LibraryBuilder()
    ..directives.add(Directive.import('package:flutter/widgets.dart'))
    ..comments.add(header)
    ..body.addAll([
      (ClassBuilder()
            ..docs.addAll([
              '/// @formatter:off',
              '/// TDesign icon collection. Use with [Icon] widget, e.g. [TIcons.home_filled].',
            ])
            /// Tree Shaking 支持
            ..annotations.add(refer('staticIconProvider'))
            ..name = fontFamily
            ..abstract = true
            ..modifier = ClassModifier.final$
            ..fields.addAll([
              (FieldBuilder()
                    ..static = true
                    ..modifier = FieldModifier.constant
                    ..name = 'iconFont'
                    ..assignment = literalString(fontFamily).code)
                  .build(),

              (FieldBuilder()
                    ..static = true
                    ..modifier = FieldModifier.constant
                    ..name = 'iconFontPackage'
                    ..assignment = literalString(fontPackage).code)
                  .build(),

              for (final icon in icons)
                (FieldBuilder()
                      ..docs.addAll([
                        '/// "$fontFamily" named "${icon.originalName}". ',
                      ])
                      ..static = true
                      ..modifier = FieldModifier.constant
                      ..name = icon.name
                      ..assignment = refer('IconData')
                          .newInstance(
                            [literalNum(int.parse(icon.codepoint, radix: 16))],
                            {
                              'fontFamily': refer('iconFont'),
                              'fontPackage': refer('iconFontPackage'),
                            },
                          )
                          .code)
                    .build(),

              (FieldBuilder()
                    ..docs.addAll(['/// "$fontFamily" all icons. '])
                    ..static = true
                    ..modifier = FieldModifier.constant
                    ..name = 'allIconsMap'
                    ..assignment = literalMap(
                      {
                        for (final icon in icons)
                          literalString(icon.name): refer(icon.name),
                      },
                      refer('String'),
                      refer('IconData'),
                    ).code)
                  .build(),
            ]))
          .build(),
    ]);

  final code =
      DartFormatter(
        pageWidth: 120,
        languageVersion: DartFormatter.latestLanguageVersion,
      ).format(
        DartEmitter(
          orderDirectives: true,
          useNullSafetySyntax: true,
        ).visitLibrary(library.build()).toString(),
      );

  final finalCode =
      '''
// dart format off
$code
// dart format on
''';

  // 脚本在 tool/ 目录下，需要写到包根目录的 lib/src/
  final outputDir = Directory(scriptDir).parent;
  Directory('${outputDir.path}/lib/src').createSync(recursive: true);
  final outputFile = File('${outputDir.path}/lib/src/assets.g.dart');
  outputFile.writeAsStringSync(finalCode);
}

// ================================================================
// 2. SVG 数据处理
// ================================================================

/// 递归处理 XML 元素，将 fill/stroke 颜色替换为占位符。
///
/// [parentChannel] 表示从父级 `<g>` 继承的颜色通道 ID（如 'fill1'）。
void _processElement(
  XmlElement element,
  String? parentChannel,
  bool isSpecified,
) {
  final id = element.getAttribute('id');
  final tagName = element.name.local;

  // 确定当前元素的颜色通道
  String? currentChannel;
  if (id != null && colorChannelIds.contains(id)) {
    currentChannel = id;
  } else if (parentChannel != null) {
    currentChannel = parentChannel;
  }

  // 处理 fill 属性
  final fill = element.getAttribute('fill');
  if (fill != null && fill != 'none') {
    if (currentChannel == 'fill1') {
      element.setAttribute('fill', '__FILL1__');
    } else if (currentChannel == 'fill2') {
      element.setAttribute('fill', '__FILL2__');
    } else if (currentChannel == 'stroke1' || currentChannel == 'stroke2') {
      // stroke 通道的 path 同时可能有 fill
      element.setAttribute('fill', '__COLOR__');
    } else if (isSpecified && id != null && tagName != 'g') {
      // specifiedIcons 的 fill 视为描边颜色
      element.setAttribute('fill', '__STROKE1__');
    } else {
      element.setAttribute('fill', '__COLOR__');
    }
  }

  // 处理 stroke 属性
  final stroke = element.getAttribute('stroke');
  if (stroke != null && stroke != 'none') {
    if (currentChannel == 'stroke1') {
      element.setAttribute('stroke', '__STROKE1__');
    } else if (currentChannel == 'stroke2') {
      element.setAttribute('stroke', '__STROKE2__');
    } else if (currentChannel == 'fill1' || currentChannel == 'fill2') {
      // fill 通道的 path 同时可能有 stroke
      element.setAttribute('stroke', '__STROKE1__');
    } else {
      element.setAttribute('stroke', '__STROKE1__');
    }
  }

  // 处理 stroke-width
  final strokeWidth = element.getAttribute('stroke-width');
  if (strokeWidth != null) {
    element.setAttribute('stroke-width', '__STROKE_WIDTH__');
  }

  // 递归处理子元素
  for (final child in element.childElements) {
    _processElement(child, currentChannel ?? parentChannel, isSpecified);
  }
}

/// 处理单个 SVG 文件，将颜色替换为占位符。
String processSvg(String svgContent, String iconName) {
  final doc = XmlDocument.parse(svgContent);
  final root = doc.rootElement;
  final isSpecified = specifiedIcons.contains(iconName);

  _processElement(root, null, isSpecified);

  return doc.toXmlString();
}

// ================================================================
// 3. 生成 svg_data.g.dart
// ================================================================

/// 将字符串转义为 Dart 多行字符串字面量。
String _escapeDartString(String input) {
  // 仅需转义反斜杠与美元符（多行字符串中不需要转义单引号）。
  return input
      .replaceAll(r'\', r'\\')
      .replaceAll(r'$', r'\$');
}

void generateSvgData(Map<String, String> svgDataMap) {
  final scriptDir = File.fromUri(Platform.script).parent.path;
  final outputDir = Directory(scriptDir).parent;
  Directory('${outputDir.path}/lib/src').createSync(recursive: true);

  final buffer = StringBuffer()
    ..writeln('// $header')
    ..writeln()
    ..writeln('/// 所有图标的 SVG 数据（已预处理颜色占位符）。')
    ..writeln('const Map<String, String> svgDataMap = {');

  final sortedKeys = svgDataMap.keys.toList()..sort();
  for (final key in sortedKeys) {
    final escaped = _escapeDartString(svgDataMap[key]!);
    buffer.writeln("  '$key': '''$escaped''',");
  }

  buffer.writeln('};');

  final outputFile = File('${outputDir.path}/lib/src/svg_data.g.dart');
  outputFile.writeAsStringSync(buffer.toString());
}

// ================================================================
// 4. 生成具名图标组件 icons.g.dart
// ================================================================

/// 将图标名转为 PascalCase 组件名（如 'ai-1' → 'Ai1Icon'）。
String _toComponentName(String iconName) {
  final parts = iconName.split(RegExp(r'[-_]'));
  final camel = parts.map((p) {
    if (p.isEmpty) return '';
    return p[0].toUpperCase() + p.substring(1);
  }).join();
  return '${camel}Icon';
}

/// 生成单个图标组件类的 Dart 代码。
String _generateIconClass(String iconName, String svgKey) {
  final className = _toComponentName(iconName);
  return '''
/// TDesign 图标「$iconName」。
///
/// 多色/可变粗细图标组件，支持 fillColor1/fillColor2/strokeColor1/strokeColor2/strokeWidth。
class $className extends StatelessWidget {
  const $className({
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
      svgData: svgDataMap['$svgKey']!,
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
''';
}

void generateNamedIcons(Map<String, String> svgDataMap) {
  final scriptDir = File.fromUri(Platform.script).parent.path;
  final outputDir = Directory(scriptDir).parent;
  Directory('${outputDir.path}/lib/src').createSync(recursive: true);

  final buffer = StringBuffer()
    ..writeln('// $header')
    ..writeln()
    ..writeln("import 'package:flutter/widgets.dart';")
    ..writeln("import 'icon_base.dart';")
    ..writeln("import 'svg_data.g.dart';")
    ..writeln();

  final sortedKeys = svgDataMap.keys.toList()..sort();
  for (final key in sortedKeys) {
    buffer.write(_generateIconClass(key, key));
  }

  final outputFile = File('${outputDir.path}/lib/src/icons.g.dart');
  outputFile.writeAsStringSync(buffer.toString());
}

// ================================================================
// 图标模型
// ================================================================

class IconModel {
  final String originalName;
  final String name;
  final String codepoint;

  IconModel({
    required this.originalName,
    required this.name,
    required this.codepoint,
  });

  factory IconModel.fromJson(Map<String, dynamic> json) {
    final originalName = json['name'];
    final name = originalName.replaceAll("-", '_');
    final codepoint = (json['codepoint'] as String).replaceAll("\\", '');

    if (!RegExp(r'^[A-Fa-f0-9]{4,6}$').hasMatch(codepoint)) {
      throw Exception(
        "Invalid codepoint format: \\$codepoint for icon name: $name. Expected format: \\E001",
      );
    }

    return IconModel(
      originalName: originalName,
      name: name,
      codepoint: codepoint,
    );
  }

  @override
  String toString() =>
      'IconItem(name: $name, originalName: $originalName, codepoint: $codepoint)';
}
