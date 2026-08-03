import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';

import 'package:tdesign_icons_example/main.dart';

void main() {
  testWidgets('主页展示 TDesign Icons 标题', (WidgetTester tester) async {
    await tester.pumpWidget(const TDesignIconsExampleApp());

    expect(find.text('TDesign Icons'), findsOneWidget);
    expect(find.byType(Icon), findsWidgets);
    expect(find.byType(TNavBar), findsOneWidget);
    expect(find.byType(TSearchBar), findsOneWidget);
    expect(find.byType(TIcon), findsWidgets);
  });

  testWidgets('点击预览图标复制 TIcon 用法并显示成功反馈', (tester) async {
    String? clipboardText;
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMethodCallHandler(SystemChannels.platform, (call) async {
          if (call.method == 'Clipboard.setData') {
            clipboardText =
                (call.arguments as Map<Object?, Object?>)['text'] as String?;
          }
          return null;
        });
    addTearDown(() {
      TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
          .setMockMethodCallHandler(SystemChannels.platform, null);
    });

    await tester.pumpWidget(const TDesignIconsExampleApp());

    final previewIcon = find.byWidgetPredicate(
      (widget) => widget is Icon && widget.size == 72,
    );
    await tester.tap(previewIcon);
    await tester.pump();

    expect(clipboardText, 'TIcon(TIcons.ability_open)');
    expect(find.text('已复制 TIcon(TIcons.ability_open)'), findsOneWidget);

    await tester.pump(const Duration(seconds: 3));
    expect(find.text('已复制 TIcon(TIcons.ability_open)'), findsNothing);
  });
}
