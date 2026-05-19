import 'dart:convert';
import 'dart:io';

void main() {
  var scriptDir = File.fromUri(Platform.script).parent.path;
  var indexPath = "$scriptDir/../../resources/icon-font/dist/index.json";
  var outputPath = "output/td_icons.dart";
  var indexFile = File(indexPath);
  if (!indexFile.existsSync()) {
    throw Exception("indexFile is not exist");
  }
  var indexContent = indexFile.readAsStringSync();
  print("indexContent:\n$indexContent");
  var jsonObj = jsonDecode(indexContent);
  var iconsJson = jsonObj["icons"];
  if (iconsJson is List) {
    var iconList = <IconModel>[];
    iconsJson.forEach((element) {
      var model = IconModel();
      model.name = (element["name"] as String).replaceAll("-", '_');
      String rawCodePoint = (element["codepoint"] as String).replaceAll(
        "\\",
        '',
      );
      if (!RegExp(r'^[A-Fa-f0-9]{4}$').hasMatch(rawCodePoint)) {
        throw Exception(
          "Invalid codepoint format: \\\\$rawCodePoint for icon name: ${element["name"].toString()}. Expected format: \\\\E001",
        );
      }
      model.codepoint = rawCodePoint;
      iconList.add(model);
    });

    print("iconList:\n$iconList");

    var fileSb = StringBuffer(fileStart);
    var varSb = StringBuffer();
    // static const accessibility_filled = IconData(0xE001, fontFamily: 'TDIcons', fontPackage: 'tdesign_flutter',);
    var mapSb = StringBuffer("  static const all = <String, IconData>{\n");
    iconList.forEach((model) {
      varSb.writeln(
        "  static const ${model.name} = IconData(0x${model.codepoint}, fontFamily: 'TDIcons', fontPackage: 'tdesign_flutter');",
      );
      mapSb.writeln("    '${model.name}': ${model.name},");
    });
    fileSb.writeln(varSb);
    fileSb.writeln(mapSb);
    fileSb.writeln(fileEnd);

    // 输出文件
    var outputFile = File(outputPath);
    if (!outputFile.existsSync()) {
      outputFile.createSync(recursive: true);
    }
    outputFile.writeAsStringSync(fileSb.toString());
  }
}

class IconModel {
  String name = "";
  String codepoint = "";
}

var fileStart = '''
import 'package:flutter/widgets.dart';

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: non_constant_identifier_names
// ignore_for_file: constant_identifier_names

class TDIcons {

  /// 私有构造方法，不支持外部创建，仅提供静态常量给外部使用
  const TDIcons._();
''';

var fileEnd = '''
  };
}
''';
