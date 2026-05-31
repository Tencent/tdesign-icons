import 'package:flutter/material.dart';
import 'package:tdesign_icons/tdesign_icons.dart';

void main() {
  runApp(App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(child: const Icon(TDIcons.logo_tdesign_filled, size: 86)),
      ),
    );
  }
}
