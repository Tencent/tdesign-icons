import 'package:flutter/material.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';

import 'icon_demo_page.dart';
import 'multi_color_demo_page.dart';

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
        builder: (context) => _HomePage(
          isDarkMode: Theme.of(context).brightness == Brightness.dark,
          onDarkModeChanged: _setDarkMode,
        ),
      ),
    );
  }
}

class _HomePage extends StatelessWidget {
  const _HomePage({
    required this.isDarkMode,
    required this.onDarkModeChanged,
  });

  final bool isDarkMode;
  final ValueChanged<bool> onDarkModeChanged;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('TDesign Icons Demo'),
        actions: [
          IconButton(
            icon: Icon(isDarkMode ? Icons.light_mode : Icons.dark_mode),
            onPressed: () => onDarkModeChanged(!isDarkMode),
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: ListTile(
              leading: const Icon(Icons.grid_view),
              title: const Text('单色图标浏览'),
              subtitle: const Text('查看全部 TDesign 图标（iconfont）'),
              trailing: const Icon(Icons.chevron_right),
              onTap: () => Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => IconDemoPage(
                    isDarkMode: isDarkMode,
                    onDarkModeChanged: onDarkModeChanged,
                  ),
                ),
              ),
            ),
          ),
          Card(
            child: ListTile(
              leading: const Icon(Icons.palette),
              title: const Text('多色 / 可变粗细 / 可变颜色图标'),
              subtitle: const Text('使用具名图标组件（如 AiIcon、AddCircleIcon）'),
              trailing: const Icon(Icons.chevron_right),
              onTap: () => Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => MultiColorDemoPage(
                    isDarkMode: isDarkMode,
                    onDarkModeChanged: onDarkModeChanged,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
