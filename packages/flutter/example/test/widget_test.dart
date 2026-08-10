import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';

import 'package:tdesign_icons_example/icon_demo_page.dart';
import 'package:tdesign_icons_example/main.dart';

void main() {
  testWidgets('主页展示 TDesign Icons 标题', (WidgetTester tester) async {
    await tester.pumpWidget(const TDesignIconsExampleApp());

    expect(find.text('TDesign Icons'), findsOneWidget);
    expect(find.byType(Icon), findsWidgets);
    expect(find.byType(TNavBar), findsOneWidget);
    expect(find.byType(TSearchBar), findsOneWidget);
    expect(find.byType(TIcon), findsWidgets);
    expect(find.byType(TSwitch), findsOneWidget);
    expect(find.byIcon(TIcons.mode_light), findsOneWidget);

    await tester.tap(find.byKey(const Key('theme-switch')));
    await tester.pumpAndSettle();

    expect(
      tester.widget<MaterialApp>(find.byType(MaterialApp)).themeMode,
      ThemeMode.dark,
    );
    expect(find.byIcon(TIcons.moon), findsOneWidget);
  });

  testWidgets('窄屏保持图标和类型布局稳定并可打开代码面板', (tester) async {
    await tester.binding.setSurfaceSize(const Size(360, 800));
    addTearDown(() => tester.binding.setSurfaceSize(null));

    await tester.pumpWidget(const TDesignIconsExampleApp());

    expect(find.byKey(const Key('copy-code-preview')), findsNothing);
    expect(find.byKey(const Key('preview-copy-button')), findsOneWidget);
    expect(find.byKey(const Key('copy-type-group')), findsOneWidget);
    final paneSizes = [
      for (final key in const [
        Key('copy-type-pane'),
        Key('preview-icon-pane'),
        Key('code-info-pane'),
      ])
        tester.getSize(find.byKey(key)),
    ];
    expect(paneSizes.toSet(), hasLength(1));
    expect(
      tester.getCenter(find.byKey(const Key('copy-type-group'))).dx,
      lessThan(
        tester.getCenter(find.byKey(const Key('preview-copy-button'))).dx,
      ),
    );
    expect(
      tester.getCenter(find.byKey(const Key('preview-copy-button'))).dx,
      lessThan(
        tester.getCenter(find.byKey(const Key('code-preview-info-button'))).dx,
      ),
    );
    expect(
      tester.getCenter(find.byKey(const Key('copy-type-group'))).dx,
      tester.getCenter(find.byKey(const Key('copy-type-pane'))).dx,
    );
    expect(
      tester.getCenter(find.byKey(const Key('preview-icon-content'))).dx,
      tester.getCenter(find.byKey(const Key('preview-icon-pane'))).dx,
    );
    expect(
      tester.getCenter(find.byKey(const Key('code-info-actions'))).dx,
      tester.getCenter(find.byKey(const Key('code-info-pane'))).dx,
    );
    expect(
      tester.getTopLeft(find.byKey(const Key('copy-type-group'))).dy,
      tester.getTopLeft(find.byKey(const Key('copy-type-pane'))).dy,
    );
    expect(
      tester.getTopLeft(find.byKey(const Key('preview-icon-content'))).dy,
      tester.getTopLeft(find.byKey(const Key('preview-icon-pane'))).dy,
    );
    expect(
      tester.getTopLeft(find.byKey(const Key('code-info-actions'))).dy,
      tester.getTopLeft(find.byKey(const Key('code-info-pane'))).dy,
    );

    final initialSize = tester.getSize(find.byKey(const Key('icon-preview')));
    await tester.tap(find.text('参数'));
    await tester.pump();
    expect(tester.getSize(find.byKey(const Key('icon-preview'))), initialSize);

    await tester.tap(find.byKey(const Key('code-preview-info-button')));
    await tester.pumpAndSettle();
    expect(find.byKey(const Key('copy-code-preview')), findsOneWidget);
    expect(find.text('参数写法'), findsOneWidget);
    expect(
      find.text('''TIcon(
  TIcons.ability_open,
  size: 24,
)'''),
      findsOneWidget,
    );
    expect(
      find.byWidgetPredicate(
        (widget) =>
            widget is TText && widget.key == const Key('copy-code-text'),
      ),
      findsOneWidget,
    );
    expect(find.byType(SelectableText), findsNothing);
    expect(tester.takeException(), isNull);
  });

  testWidgets('大屏限制列表单元尺寸并放大预览图标', (tester) async {
    await tester.binding.setSurfaceSize(const Size(1200, 900));
    addTearDown(() => tester.binding.setSurfaceSize(null));

    await tester.pumpWidget(const TDesignIconsExampleApp());

    final previewButtonSize = tester.getSize(
      find.byKey(const Key('preview-copy-button')),
    );
    final gridItemSize = tester.getSize(
      find.byKey(const ValueKey('icon-grid-item-ability_open')),
    );
    final gridIconSize = tester.getSize(
      find.byKey(const ValueKey('icon-grid-icon-ability_open')),
    );

    expect(previewButtonSize, const Size(144, 132));
    expect(gridItemSize.width, lessThanOrEqualTo(128));
    expect(gridIconSize, const Size.square(36));
    final paneWidths = [
      for (final key in const [
        Key('copy-type-pane'),
        Key('preview-icon-pane'),
        Key('code-info-pane'),
      ])
        tester.getSize(find.byKey(key)).width,
    ];
    expect(paneWidths.toSet(), hasLength(1));
    expect(
      tester.getCenter(find.byKey(const Key('copy-type-group'))).dx,
      tester.getCenter(find.byKey(const Key('copy-type-pane'))).dx,
    );
    expect(
      tester.getCenter(find.byKey(const Key('preview-icon-content'))).dx,
      tester.getCenter(find.byKey(const Key('preview-icon-pane'))).dx,
    );
    expect(
      tester.getCenter(find.byKey(const Key('code-info-actions'))).dx,
      tester.getCenter(find.byKey(const Key('code-info-pane'))).dx,
    );
    expect(
      tester.getTopLeft(find.byKey(const Key('copy-type-group'))).dy,
      tester.getTopLeft(find.byKey(const Key('code-info-actions'))).dy,
    );
    expect(
      tester.getTopLeft(find.byKey(const Key('preview-icon-content'))).dy,
      tester.getTopLeft(find.byKey(const Key('code-info-actions'))).dy,
    );
    expect(tester.takeException(), isNull);
  });

  testWidgets('极窄 viewport 和空 IconTheme 仍可打开代码面板', (tester) async {
    final token = TThemeData.defaultData();
    final theme = TThemeBuilder.light(
      token,
    ).copyWith(iconTheme: const IconThemeData());

    await tester.pumpWidget(
      MaterialApp(
        theme: theme,
        home: MediaQuery(
          data: const MediaQueryData(size: Size(16, 800)),
          child: IconDemoPage(isDarkMode: false, onDarkModeChanged: (_) {}),
        ),
      ),
    );

    await tester.tap(find.byKey(const Key('code-preview-info-button')));
    await tester.pumpAndSettle();

    expect(find.byKey(const Key('copy-code-preview')), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('选择复制写法后点击预览图标复制并展示成功过渡', (tester) async {
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

    expect(find.text('基础写法'), findsNothing);
    expect(find.text('TIcon(TIcons.ability_open)'), findsNothing);
    expect(find.text('点击图标复制'), findsOneWidget);
    expect(find.byIcon(TIcons.copy), findsOneWidget);
    expect(
      find.byWidgetPredicate((widget) => widget is TRadioGroup),
      findsOneWidget,
    );

    await tester.tap(find.text('名称'));
    await tester.pump();

    expect(find.text('名称写法'), findsNothing);
    expect(find.text("TIcon.fromName('ability_open')"), findsNothing);

    await tester.tap(find.text('参数'));
    await tester.pump();

    await tester.tap(find.byKey(const Key('color-brand')));
    await tester.pump();

    const customCode = '''TIcon(
  TIcons.ability_open,
  size: 24,
  color: context.tTheme.brandNormalColor,
)''';
    expect(find.text('参数写法'), findsNothing);
    expect(find.text(customCode), findsNothing);

    await tester.tap(find.byKey(const Key('code-preview-info-button')));
    await tester.pumpAndSettle();
    expect(find.text('参数写法'), findsOneWidget);
    expect(find.text(customCode), findsOneWidget);

    await tester.tap(find.byIcon(TIcons.close_circle));
    await tester.pumpAndSettle();

    await tester.tap(find.byKey(const Key('preview-copy-button')));
    await tester.pump();

    expect(clipboardText, customCode);
    expect(find.text('已复制参数写法'), findsOneWidget);
    expect(find.byIcon(TIcons.check_circle_filled), findsWidgets);
    expect(find.byType(TMessage), findsNothing);

    await tester.pump(const Duration(seconds: 2));
    expect(find.text('点击图标复制'), findsOneWidget);
  });
}
