import 'package:flutter/material.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';

import 'icon_demo_page.dart';

void main() {
  runApp(const TDesignIconsExampleApp());
}

/// TDesign Icons 示例应用入口。
class TDesignIconsExampleApp extends StatelessWidget {
  const TDesignIconsExampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    final token = TThemeData.defaultData();

    return MaterialApp(
      title: 'TDesign Icons Demo',
      debugShowCheckedModeBanner: false,
      theme: TThemeBuilder.light(token),
      darkTheme: TThemeBuilder.dark(token),
      themeMode: ThemeMode.system,
      home: const IconDemoPage(),
    );
  }
}
