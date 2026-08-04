import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';

/// 单个 TDesign 图标条目，包含名称与 [IconData]。
typedef IconEntry = MapEntry<String, IconData>;

enum _CopyType {
  basic('基础'),
  byName('名称'),
  custom('参数');

  const _CopyType(this.label);

  final String label;

  String codeFor(String iconName, {String? colorCode}) => switch (this) {
    _CopyType.basic => 'TIcon(TIcons.$iconName)',
    _CopyType.byName => "TIcon.fromName('$iconName')",
    _CopyType.custom =>
      'TIcon(\n'
          '  TIcons.$iconName,\n'
          '  size: 24,\n'
          '${colorCode == null ? '' : '  color: $colorCode,\n'}'
          ')',
  };
}

enum _IconColorOption {
  brand('品牌色', 'context.tTheme.brandNormalColor'),
  error('错误色', 'context.tTheme.errorNormalColor'),
  success('成功色', 'context.tTheme.successNormalColor'),
  warning('警告色', 'context.tTheme.warningNormalColor'),
  secondary('次要文本色', 'context.tTheme.textColorSecondary'),
  purple('自定义紫色', 'const Color(0xFF834EC2)');

  const _IconColorOption(this.label, this.code);

  final String label;
  final String code;

  Color resolve(TThemeData token) => switch (this) {
    _IconColorOption.brand => token.brandNormalColor,
    _IconColorOption.error => token.errorNormalColor,
    _IconColorOption.success => token.successNormalColor,
    _IconColorOption.warning => token.warningNormalColor,
    _IconColorOption.secondary => token.textColorSecondary,
    _IconColorOption.purple => const Color(0xFF834EC2),
  };
}

/// TDesign Icons 演示主页：顶部展示选中图标，下方可搜索浏览全部图标。
class IconDemoPage extends StatefulWidget {
  const IconDemoPage({
    super.key,
    required this.isDarkMode,
    required this.onDarkModeChanged,
  });

  final bool isDarkMode;
  final ValueChanged<bool> onDarkModeChanged;

  @override
  State<IconDemoPage> createState() => _IconDemoPageState();
}

class _IconDemoPageState extends State<IconDemoPage> {
  /// 全部图标列表，启动时从 [TIcons.allIconsMap] 读取。
  late final List<IconEntry> _allIcons = TIcons.allIconsMap.entries.toList()
    ..sort((a, b) => a.key.compareTo(b.key));

  /// 当前选中的图标名称。
  late String _selectedIconName = _allIcons.first.key;

  /// 搜索关键词，用于过滤下方网格。
  String _searchQuery = '';

  /// 当前选中的图标颜色类型，`null` 表示使用 IconTheme 默认颜色。
  _IconColorOption? _iconColorOption;

  /// 当前选择的复制写法。
  _CopyType _copyType = _CopyType.basic;

  /// 最近完成复制的图标名称，用于驱动预览区成功态。
  String? _copiedIconName;

  Timer? _copyFeedbackTimer;

  /// 解析实际用于 [Icon] 的颜色，默认色跟随 [IconTheme]。
  Color _resolveIconColor(ThemeData theme, TThemeData token) {
    return _iconColorOption?.resolve(token) ??
        theme.iconTheme.color ??
        token.textColorPrimary;
  }

  /// 根据搜索词过滤后的图标列表。
  List<IconEntry> get _filteredIcons {
    final query = _searchQuery.trim().toLowerCase();
    if (query.isEmpty) {
      return _allIcons;
    }
    return _allIcons
        .where((entry) => entry.key.toLowerCase().contains(query))
        .toList();
  }

  IconEntry get _selectedIcon {
    return _allIcons.firstWhere(
      (entry) => entry.key == _selectedIconName,
      orElse: () => _allIcons.first,
    );
  }

  /// 选中指定图标并在顶部展示。
  void _selectIcon(IconEntry entry) {
    _copyFeedbackTimer?.cancel();
    setState(() {
      _selectedIconName = entry.key;
      _copiedIconName = null;
    });
  }

  void _selectCopyType(_CopyType type) {
    _copyFeedbackTimer?.cancel();
    setState(() {
      _copyType = type;
      _copiedIconName = null;
    });
  }

  /// 复制当前图标在 TDesign Flutter 图标容器中的用法。
  Future<void> _copyIcon(IconEntry entry) async {
    final code = _copyType.codeFor(
      entry.key,
      colorCode: _iconColorOption?.code,
    );
    await Clipboard.setData(ClipboardData(text: code));
    if (!mounted) {
      return;
    }

    _copyFeedbackTimer?.cancel();
    setState(() => _copiedIconName = entry.key);
    _copyFeedbackTimer = Timer(const Duration(milliseconds: 1600), () {
      if (mounted && _copiedIconName == entry.key) {
        setState(() => _copiedIconName = null);
      }
    });
  }

  /// 在覆盖层中展示当前选择的代码写法，避免代码行数影响主页布局。
  void _showCodePreview(IconEntry entry) {
    final width = (MediaQuery.sizeOf(context).width - 32)
        .clamp(0.0, 328.0)
        .toDouble();
    TPopup.show(
      context,
      options: TPopupOptions.center(
        width: width,
        height: 184,
        child: _buildCodePreview(entry, context.tTheme),
      ),
    );
  }

  @override
  void dispose() {
    _copyFeedbackTimer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final filtered = _filteredIcons;

    return Scaffold(
      appBar: TNavBar(
        titleWidget: const TText('TDesign Icons', fontWeight: FontWeight.w600),
        useDefaultBack: false,
        actions: [
          TNavBarItem(
            customWidget: TText(
              '共 ${_allIcons.length} 个',
              font: context.tTheme.fontBodySmall,
              textColor: context.tTheme.textColorSecondary,
            ),
            onTap: () {},
          ),
        ],
      ),
      body: Column(
        children: [
          _buildPreview(theme),
          _buildColorPicker(theme),
          _buildSearchBar(),
          Expanded(child: _buildIconGrid(filtered, theme)),
        ],
      ),
    );
  }

  /// 顶部预览区：展示当前选中的大号图标与名称。
  Widget _buildPreview(ThemeData theme) {
    final entry = _selectedIcon;
    final copied = _copiedIconName == entry.key;
    final token = context.tTheme;

    return Container(
      key: const Key('icon-preview'),
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            theme.colorScheme.primaryContainer,
            theme.colorScheme.surface,
          ],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
      ),
      child: LayoutBuilder(
        builder: (context, constraints) {
          final compact = constraints.maxWidth < 360;
          final cardWidth = compact ? 96.0 : 112.0;
          final cardHeight = compact ? 88.0 : 104.0;

          return SizedBox(
            height: compact ? 148 : 168,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Expanded(
                  child: SizedBox.expand(
                    key: const Key('copy-type-pane'),
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: SizedBox(
                        width: compact ? 108 : 120,
                        child: TRadioGroup<_CopyType>(
                          key: const Key('copy-type-group'),
                          value: _copyType,
                          options: [
                            for (final type in _CopyType.values)
                              TRadioOption(value: type, label: type.label),
                          ],
                          size: TRadioSize.small,
                          onChanged: _selectCopyType,
                        ),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: SizedBox.expand(
                    key: const Key('preview-icon-pane'),
                    child: Align(
                      alignment: Alignment.topCenter,
                      child: SizedBox(
                        width: cardWidth,
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            _buildCopyButton(
                              entry: entry,
                              copied: copied,
                              token: token,
                              width: cardWidth,
                              height: cardHeight,
                            ),
                            const SizedBox(height: 4),
                            TText(
                              entry.key,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: theme.textTheme.titleSmall?.copyWith(
                                fontWeight: FontWeight.w600,
                              ),
                              textAlign: TextAlign.center,
                            ),
                            const SizedBox(height: 4),
                            TText(
                              copied ? '已复制${_copyType.label}写法' : '点击图标复制',
                              key: const Key('preview-copy-hint'),
                              font: token.fontBodySmall,
                              textColor: copied
                                  ? token.successNormalColor
                                  : token.textColorSecondary,
                              textAlign: TextAlign.center,
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: SizedBox.expand(
                    key: const Key('code-info-pane'),
                    child: Align(
                      alignment: Alignment.topLeft,
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Semantics(
                            label: '查看 ${entry.key} 代码写法',
                            button: true,
                            child: IconButton(
                              key: const Key('code-preview-info-button'),
                              onPressed: () => _showCodePreview(entry),
                              icon: TIcon(
                                TIcons.info_circle,
                                color: token.brandNormalColor,
                                semanticLabel: '查看代码',
                              ),
                            ),
                          ),
                          const SizedBox(width: 4),
                          _buildThemeSwitch(token),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildThemeSwitch(TThemeData token) {
    return Semantics(
      label: '暗黑主题',
      child: SizedBox(
        key: const Key('theme-switch'),
        width: 45,
        height: 28,
        child: Stack(
          children: [
            TSwitch(
              value: widget.isDarkMode,
              size: TSwitchSize.medium,
              variant: TSwitchVariant.filled,
              onChanged: widget.onDarkModeChanged,
            ),
            Positioned.fill(
              left: 2,
              right: 2,
              child: IgnorePointer(
                child: AnimatedAlign(
                  duration: const Duration(milliseconds: 200),
                  alignment: widget.isDarkMode
                      ? Alignment.centerRight
                      : Alignment.centerLeft,
                  child: SizedBox(
                    width: 24,
                    height: 24,
                    child: Center(
                      child: TIcon(
                        widget.isDarkMode ? TIcons.moon : TIcons.mode_light,
                        key: const Key('theme-switch-icon'),
                        size: 16,
                        color: widget.isDarkMode
                            ? token.brandNormalColor
                            : token.warningNormalColor,
                        semanticLabel: widget.isDarkMode ? '暗黑模式' : '明亮模式',
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCodePreview(IconEntry entry, TThemeData token) {
    return Container(
      key: const Key('copy-code-preview'),
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TText(
            '${_copyType.label}写法',
            font: token.fontBodySmall,
            textColor: token.textColorSecondary,
          ),
          const SizedBox(height: 8),
          TText(
            _copyType.codeFor(entry.key, colorCode: _iconColorOption?.code),
            key: const Key('copy-code-text'),
            style: TextStyle(
              color: token.textColorPrimary,
              fontFamily: 'monospace',
              fontSize: 12,
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCopyButton({
    required IconEntry entry,
    required bool copied,
    required TThemeData token,
    required double width,
    required double height,
  }) {
    return Semantics(
      label: copied
          ? '${entry.key} ${_copyType.label}写法已复制'
          : '复制 ${entry.key} ${_copyType.label}写法',
      button: true,
      child: InkResponse(
        key: const Key('preview-copy-button'),
        onTap: () => _copyIcon(entry),
        mouseCursor: SystemMouseCursors.click,
        containedInkWell: true,
        highlightShape: BoxShape.rectangle,
        borderRadius: BorderRadius.circular(16),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          width: width,
          height: height,
          decoration: BoxDecoration(
            color: copied ? token.successLightColor : token.bgColorContainer,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: copied ? token.successNormalColor : token.brandNormalColor,
              width: 1.5,
            ),
            boxShadow: token.shadowsBase,
          ),
          child: Stack(
            children: [
              Center(
                child: AnimatedSwitcher(
                  duration: const Duration(milliseconds: 220),
                  transitionBuilder: (child, animation) => FadeTransition(
                    opacity: animation,
                    child: ScaleTransition(scale: animation, child: child),
                  ),
                  child: copied
                      ? TIcon(
                          TIcons.check_circle_filled,
                          key: const ValueKey('copy-success-icon'),
                          size: 56,
                          color: token.successNormalColor,
                          semanticLabel: '复制成功',
                        )
                      : TIcon(
                          entry.value,
                          key: ValueKey(entry.key),
                          size: width < 100 ? 60 : 72,
                          color: _iconColorOption?.resolve(token),
                          semanticLabel: entry.key,
                        ),
                ),
              ),
              if (!copied)
                Positioned(
                  top: 8,
                  right: 8,
                  child: TIcon(
                    TIcons.copy,
                    size: 18,
                    color: token.brandNormalColor,
                    semanticLabel: '复制',
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }

  /// 颜色选择区：默认色 + 六个色块，用于测试 [Icon] 的 color 属性。
  Widget _buildColorPicker(ThemeData theme) {
    final token = context.tTheme;
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
      child: Row(
        children: [
          _buildDefaultColorSwatch(theme),
          ...List.generate(_IconColorOption.values.length, (index) {
            final option = _IconColorOption.values[index];
            final color = option.resolve(token);
            final isSelected = _iconColorOption == option;

            return Padding(
              padding: const EdgeInsets.only(left: 12),
              child: _buildColorSwatch(
                theme: theme,
                option: option,
                color: color,
                isSelected: isSelected,
                onTap: () => setState(() => _iconColorOption = option),
              ),
            );
          }),
        ],
      ),
    );
  }

  /// 默认颜色色块：不传 [Icon.color] 时使用主题色。
  Widget _buildDefaultColorSwatch(ThemeData theme) {
    final isSelected = _iconColorOption == null;
    final defaultColor = _resolveIconColor(theme, context.tTheme);

    return Semantics(
      label: '选择默认颜色',
      button: true,
      selected: isSelected,
      child: InkWell(
        onTap: () => setState(() => _iconColorOption = null),
        customBorder: const CircleBorder(),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            color: theme.colorScheme.surfaceContainerHighest,
            shape: BoxShape.circle,
            border: Border.all(
              color: isSelected
                  ? theme.colorScheme.onSurface
                  : theme.colorScheme.outlineVariant,
              width: isSelected ? 2.5 : 1,
            ),
          ),
          child: isSelected
              ? TIcon(TIcons.check, size: 18, color: defaultColor)
              : TIcon(TIcons.palette, size: 18, color: defaultColor),
        ),
      ),
    );
  }

  /// 单个自定义颜色色块。
  Widget _buildColorSwatch({
    required ThemeData theme,
    required _IconColorOption option,
    required Color color,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return Semantics(
      label: '选择${option.label}',
      button: true,
      selected: isSelected,
      child: InkWell(
        key: ValueKey('color-${option.name}'),
        onTap: onTap,
        customBorder: const CircleBorder(),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            color: color,
            shape: BoxShape.circle,
            border: Border.all(
              color: isSelected
                  ? theme.colorScheme.onSurface
                  : theme.colorScheme.outlineVariant,
              width: isSelected ? 2.5 : 1,
            ),
            boxShadow: isSelected
                ? [
                    BoxShadow(
                      color: color.withValues(alpha: 0.35),
                      blurRadius: 8,
                      offset: const Offset(0, 2),
                    ),
                  ]
                : null,
          ),
          child: isSelected
              ? TIcon(TIcons.check, size: 18, color: _contrastColor(color))
              : null,
        ),
      ),
    );
  }

  /// 根据背景色返回对比度较高的前景色，用于勾选图标。
  Color _contrastColor(Color background) {
    return background.computeLuminance() > 0.5 ? Colors.black87 : Colors.white;
  }

  /// 搜索栏，按图标名称过滤。
  Widget _buildSearchBar() {
    return TSearchBar(
      hintText: '搜索图标名称…',
      onChanged: (value) => setState(() => _searchQuery = value),
    );
  }

  /// 图标网格，点击后在顶部预览区展示。
  Widget _buildIconGrid(List<IconEntry> icons, ThemeData theme) {
    if (icons.isEmpty) {
      return const TEmpty(icon: TIcons.search, emptyText: '未找到匹配的图标');
    }

    final iconColor = _iconColorOption?.resolve(context.tTheme);
    return GridView.builder(
      padding: const EdgeInsets.all(12),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 4,
        mainAxisSpacing: 8,
        crossAxisSpacing: 8,
        childAspectRatio: 0.85,
      ),
      itemCount: icons.length,
      itemBuilder: (context, index) {
        final entry = icons[index];
        final isSelected = entry.key == _selectedIconName;

        return Material(
          color: isSelected
              ? theme.colorScheme.primaryContainer
              : theme.colorScheme.surfaceContainerHighest,
          borderRadius: BorderRadius.circular(8),
          child: InkWell(
            borderRadius: BorderRadius.circular(8),
            onTap: () => _selectIcon(entry),
            child: Padding(
              padding: const EdgeInsets.all(6),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  TIcon(entry.value, size: 28, color: iconColor),
                  const SizedBox(height: 4),
                  TText(
                    entry.key,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    textAlign: TextAlign.center,
                    style: theme.textTheme.labelSmall?.copyWith(
                      fontSize: 9,
                      color: isSelected
                          ? theme.colorScheme.primary
                          : theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
