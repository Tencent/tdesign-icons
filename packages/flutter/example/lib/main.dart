import 'package:flutter/material.dart';

import 'icon_demo_page.dart';

void main() {
  runApp(const TDesignIconsExampleApp());
}

/// TDesign Icons 示例应用入口。
class TDesignIconsExampleApp extends StatelessWidget {
  const TDesignIconsExampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TDesign Icons Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF0052D9)),
        useMaterial3: true,
      ),
      home: const IconDemoPage(),
    );
  }
}
