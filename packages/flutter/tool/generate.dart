import 'dart:convert';
import 'dart:io';

import 'package:code_builder/code_builder.dart';
import 'package:dart_style/dart_style.dart';

const fontFamily = 'TIcons';
const fontPackage = 'tdesign_flutter_icons';

void main() {
  final scriptDir = File.fromUri(Platform.script).parent.path;

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

  generate(icons);
}

const header = '''TDesign Icons for Flutter
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: constant_identifier_names, unused_element''';

void generate(List<IconModel> icons) {
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
