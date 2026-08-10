import 'package:flutter/material.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';

import 'icon_demo_page.dart';

void main() {
  runApp(const TDesignIconsExampleApp());
}

/// TDesign Icons 示例应用入口。
class TDesignIconsExampleApp extends StatefulWidget {
  const TDesignIconsExampleApp({super.key});

  @override
  State<TDesignIconsExampleApp> createState() => _TDesignIconsExampleAppState();
}

class _TDesignIconsExampleAppState extends State<TDesignIconsExampleApp> {
  ThemeMode _themeMode = ThemeMode.system;

  void _setDarkMode(bool enabled) {
    setState(() => _themeMode = enabled ? ThemeMode.dark : ThemeMode.light);
  }

  @override
  Widget build(BuildContext context) {
    final token = TThemeData.defaultData();

    return MaterialApp(
      title: 'TDesign Icons Demo',
      debugShowCheckedModeBanner: false,
      theme: TThemeBuilder.light(token),
      darkTheme: TThemeBuilder.dark(token),
      themeMode: _themeMode,
      home: Builder(
        builder: (context) => IconDemoPage(
          isDarkMode: Theme.of(context).brightness == Brightness.dark,
          onDarkModeChanged: _setDarkMode,
        ),
      ),
    );
  }
}
