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

  // 读取半透明重叠图层的检测结果（由 Node 侧 gulp 工具生成）。
  final overlapManifest = _loadOverlapManifest(scriptDir);

  final svgDataMap = <String, String>{};
  for (final file in svgFiles) {
    final iconName = file.uri.pathSegments.last.replaceAll('.svg', '');
    final svgContent = file.readAsStringSync();
    svgDataMap[iconName] = processSvg(svgContent, iconName, overlapManifest);
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
///
/// 若 [overlapManifest] 中记录了该图标的半透明图层重叠信息，则还会：
/// 1. 合并相邻的同描边路径（修复同层描边重叠导致的二次变深）；
/// 2. 为重叠的底层生成 `<mask>`，避免半透明颜色在重叠处被混合两次。
String processSvg(String svgContent, String iconName, Map<String, dynamic> overlapManifest) {
  final doc = XmlDocument.parse(svgContent);
  final root = doc.rootElement;
  final isSpecified = specifiedIcons.contains(iconName);

  _processElement(root, null, isSpecified);

  final entry = overlapManifest[iconName];
  if (entry != null && entry is Map<String, dynamic>) {
    _applyOverlapFixes(root, entry);
  }

  return doc.toXmlString();
}

// ================================================================
// 2.1 半透明图层重叠处理（对齐上游 gulp/opacity-overlap.ts）
// ================================================================

/// 可参与绘制的基本图形标签。
const _drawableTags = <String>{
  'circle',
  'ellipse',
  'line',
  'path',
  'polygon',
  'polyline',
  'rect',
};

/// 只定义引用内容、不参与实际绘制的标签。
const _definitionTags = <String>{
  'clippath',
  'defs',
  'filter',
  'lineargradient',
  'marker',
  'mask',
  'pattern',
  'radialgradient',
  'symbol',
};

/// 读取半透明重叠检测清单（`tool/overlap_manifest.json`）。
Map<String, dynamic> _loadOverlapManifest(String scriptDir) {
  final manifestFile = File('$scriptDir/overlap_manifest.json');
  if (!manifestFile.existsSync()) {
    return const {};
  }
  return (json.decode(manifestFile.readAsStringSync()) as Map)
      .cast<String, dynamic>();
}

/// 判断 fill/stroke 是否为可见绘制（非 none/transparent）。
bool _isVisiblePaint(String? value) {
  if (value == null) {
    return false;
  }
  final v = value.trim().toLowerCase();
  return v != 'none' && v != 'transparent';
}

/// 收集子树中实际出现的 paint 类型（fill / stroke）。
Set<String> _getPaintTypes(XmlElement node) {
  final found = <String>{};
  void visit(XmlElement element) {
    if (_isVisiblePaint(element.getAttribute('fill'))) {
      found.add('fill');
    }
    if (_isVisiblePaint(element.getAttribute('stroke'))) {
      found.add('stroke');
    }
    for (final child in element.childElements) {
      visit(child);
    }
  }

  visit(node);
  return found;
}

/// 取上层元素的 paint 类型（单个 paint 图层取首个，缺省回退为 fill）。
String _upperPaintType(XmlElement upper) {
  final types = _getPaintTypes(upper);
  return types.isEmpty ? 'fill' : types.first;
}

/// 计算用于比较路径“其他属性”的键（排除 d / id）。
String _comparableAttrsKey(XmlElement element) {
  final attrs = <String>[];
  for (final attr in element.attributes) {
    final name = attr.name.local;
    if (name == 'd' || name == 'id') {
      continue;
    }
    attrs.add('$name=${attr.value}');
  }
  attrs.sort();
  return attrs.join('&');
}

/// 判断相邻的两个描边 path 是否可以合并成一条复合路径。
bool _canMergeStrokePaths(XmlElement previous, XmlElement current) {
  if (previous.name.local != 'path' || current.name.local != 'path') {
    return false;
  }
  final previousStroke = previous.getAttribute('stroke');
  if (!_isVisiblePaint(previousStroke) ||
      previousStroke != current.getAttribute('stroke')) {
    return false;
  }
  if (_isVisiblePaint(previous.getAttribute('fill')) ||
      _isVisiblePaint(current.getAttribute('fill'))) {
    return false;
  }
  if (previous.getAttribute('id') != current.getAttribute('id')) {
    return false;
  }
  return _comparableAttrsKey(previous) == _comparableAttrsKey(current);
}

/// 合并同一父节点下相邻且描边属性完全相同的 path，
/// 使半透明描边只在合并后的复合路径上应用一次，避免重叠处二次变深。
void _mergeAdjacentStrokePaths(XmlElement parent) {
  final children = parent.childElements.toList();
  for (var i = 1; i < children.length; i++) {
    final previous = children[i - 1];
    final current = children[i];
    if (!_canMergeStrokePaths(previous, current)) {
      continue;
    }
    final previousD = previous.getAttribute('d') ?? '';
    final currentD = current.getAttribute('d') ?? '';
    previous.setAttribute('d', '$previousD $currentD'.trim());
    parent.children.remove(current);
    children.removeAt(i);
    i--;
  }
}

/// 递归查找指定 id 的元素。
XmlElement? _findElementById(XmlElement node, String id) {
  if (node.getAttribute('id') == id) {
    return node;
  }
  for (final child in node.childElements) {
    final found = _findElementById(child, id);
    if (found != null) {
      return found;
    }
  }
  return null;
}

/// 将上层元素克隆为 mask 形状：用 `#000`（隐藏）标记其绘制区域，
/// 其余部分设为 `none`，从而在 luminance mask 中把下层在该区域的绘制抠掉。
XmlElement _makeMaskShape(XmlElement node, String paintType) {
  final clone = node.copy();
  clone.attributes.removeWhere((attr) {
    return const {'id', 'class', 'className', 'mask', 'opacity',
            'fill-opacity', 'stroke-opacity', 'style'}
        .contains(attr.name.local);
  });

  void normalize(XmlElement element) {
    final tagName = element.name.local;
    if (_drawableTags.contains(tagName)) {
      final fillTarget =
          paintType == 'fill' && _isVisiblePaint(element.getAttribute('fill'));
      final strokeTarget =
          paintType == 'stroke' &&
          _isVisiblePaint(element.getAttribute('stroke'));
      element.setAttribute('fill', fillTarget ? '#000' : 'none');
      element.setAttribute('stroke', strokeTarget ? '#000' : 'none');
    }
    for (final child in element.childElements.toList()) {
      normalize(child);
    }
  }

  normalize(clone);
  return clone;
}

/// 将属性映射转为 [XmlAttribute] 列表，便于构造 [XmlElement]。
List<XmlAttribute> _xmlAttrs(Map<String, String> map) => [
      for (final e in map.entries) XmlAttribute(XmlName(e.key), e.value),
    ];

/// 生成一个 mask 元素：白色矩形铺满 viewBox，再把各上层元素的绘制区域标黑。
XmlElement _makeMask(String id, List<XmlElement> upperNodes, String viewBox) {
  final viewBoxValues = viewBox.trim().split(RegExp(r'[\s,]+'));
  String value(int index, String fallback) =>
      viewBoxValues.length > index ? viewBoxValues[index] : fallback;
  final x = value(0, '0');
  final y = value(1, '0');
  final width = value(2, '24');
  final height = value(3, '24');

  final maskChildren = <XmlNode>[
    XmlElement(
      XmlName('rect'),
      _xmlAttrs(
          {'x': x, 'y': y, 'width': width, 'height': height, 'fill': '#fff'}),
    ),
    for (final upper in upperNodes)
      _makeMaskShape(upper, _upperPaintType(upper)),
  ];

  return XmlElement(
    XmlName('mask'),
    _xmlAttrs({
      'id': id,
      'maskUnits': 'userSpaceOnUse',
      'maskContentUnits': 'userSpaceOnUse',
      'mask-type': 'luminance',
      'x': x,
      'y': y,
      'width': width,
      'height': height,
    }),
    maskChildren,
  );
}

/// 把 mask 追加到 `<defs>`（若无则创建）。
void _appendToDefs(XmlElement root, XmlElement mask) {
  XmlElement? defs;
  for (final child in root.childElements) {
    if (child.name.local == 'defs') {
      defs = child;
      break;
    }
  }
  if (defs == null) {
    defs = XmlElement(XmlName('defs'), _xmlAttrs(const {}), const []);
    root.children.insert(0, defs);
  }
  defs.children.add(mask);
}

/// 依据检测清单为图标应用重叠修复：
/// 1. 合并相邻描边路径（internal 图层）；
/// 2. 为重叠的下层生成 mask 并挂在对应元素上。
void _applyOverlapFixes(XmlElement root, Map<String, dynamic> entry) {
  final internal = (entry['internal'] as List? ?? const [])
      .cast<String>();
  // 内部描边重叠：先合并同父节点下的相邻同描边路径。
  if (internal.isNotEmpty) {
    void mergeGroups(XmlElement node) {
      if (_definitionTags.contains(node.name.local)) {
        return;
      }
      _mergeAdjacentStrokePaths(node);
      for (final child in node.childElements.toList()) {
        mergeGroups(child);
      }
    }

    mergeGroups(root);
  }

  final overlaps = (entry['overlaps'] as List? ?? const [])
      .cast<Map<String, dynamic>>();
  if (overlaps.isEmpty) {
    return;
  }

  final viewBox = root.getAttribute('viewBox') ?? '0 0 24 24';
  var maskIndex = 0;
  for (final overlap in overlaps) {
    final lowerId = overlap['lower'] as String?;
    final upperIds = (overlap['upper'] as List? ?? const []).cast<String>();
    if (lowerId == null || upperIds.isEmpty) {
      continue;
    }

    final lower = _findElementById(root, lowerId);
    if (lower == null || lower.getAttribute('mask') != null) {
      continue;
    }

    final uppers = <XmlElement>[];
    for (final id in upperIds) {
      final upper = _findElementById(root, id);
      if (upper != null) {
        uppers.add(upper);
      }
    }
    if (uppers.isEmpty) {
      continue;
    }

    final maskId = 'overlap-mask-$maskIndex';
    _appendToDefs(root, _makeMask(maskId, uppers, viewBox));
    lower.setAttribute('mask', 'url(#$maskId)');
    maskIndex++;
  }
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
