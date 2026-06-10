import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:tdesign_icons_example/main.dart';

void main() {
  testWidgets('主页展示 TDesign Icons 标题', (WidgetTester tester) async {
    await tester.pumpWidget(const TDesignIconsExampleApp());

    expect(find.text('TDesign Icons'), findsOneWidget);
    expect(find.byType(Icon), findsWidgets);
  });
}
