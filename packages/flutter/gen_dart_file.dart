import 'dart:convert';
import 'dart:io';

void main(){
  var indexPath = "../../resources/icon-font/dist/index.json";
  var outputPath = "output/td_icons.dart";
  var indexFile = File(indexPath);
  if(!indexFile.existsSync()){
    print("indexFile is not exist");
    return ;
  }
  var indexContent = indexFile.readAsStringSync().replaceFirst('"\\\\E842"},]}', '"\\\\E842"}]}');
  print("indexContent:\n$indexContent");
  var jsonObj = jsonDecode(indexContent);
  var iconsJson = jsonObj["icons"];
  if(iconsJson is List){
    var iconList = <IconModel>[];
    iconsJson.forEach((element) { 
      var model = IconModel();
      model.name = (element["name"] as String).replaceAll("-", '_');
      model.codepoint = (element["codepoint"] as String).replaceAll("\\", '');
      iconList.add(model);
    });

    print("iconList:\n$iconList");

    var fileSb = StringBuffer(fileStart);
    var varSb = StringBuffer();
    var mapSb = StringBuffer("  static const all = <String, _TDIconsData>{");
    iconList.forEach((model) {
      varSb.writeln("  static const ${model.name} = _TDIconsData(0x${model.codepoint}, '${model.name}');");
      mapSb.writeln("    '${model.name}': ${model.name},");
    });
    fileSb.writeln(varSb);
    fileSb.writeln(mapSb);
    fileSb.writeln(fileEnd);

    // 输出文件
    var outputFile = File(outputPath);
    if(!outputFile.existsSync()){
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
@immutable
class _TDIconsData extends IconData {
  const _TDIconsData(int codePoint, this.name)
      : super(
    codePoint,
    fontFamily: 'TDIcons',
    fontPackage: 'tdesign_flutter',
  );

  final String name;
}


class TDIcons {

  /// 私有构造方法，不支持外部创建，仅提供静态常量给外部使用
  const TDIcons._();
''';

var fileEnd = '''
  };
}
''';