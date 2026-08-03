import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';

/// 单个 TDesign 图标条目，包含名称与 [IconData]。
typedef IconEntry = MapEntry<String, IconData>;

/// TDesign Icons 演示主页：顶部展示选中图标，下方可搜索浏览全部图标。
class IconDemoPage extends StatefulWidget {
  const IconDemoPage({super.key});

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

  /// 可选的测试颜色列表。
  static const _testColors = <Color>[
    Color(0xFF0052D9), // TDesign 品牌蓝
    Color(0xFFE34D59), // 错误红
    Color(0xFF00A870), // 成功绿
    Color(0xFFED7B2F), // 警告橙
    Color(0xFF834EC2), // 紫色
    Color(0xFF909399), // 中性灰
  ];

  /// 当前选中的图标颜色，`null` 表示使用主题默认颜色。
  Color? _iconColor;

  /// 解析实际用于 [Icon] 的颜色，默认色跟随 [IconTheme]。
  Color? _resolveIconColor(ThemeData theme) {
    return _iconColor ?? theme.iconTheme.color;
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
    setState(() {
      _selectedIconName = entry.key;
    });
  }

  /// 复制当前图标在 TDesign Flutter 图标容器中的用法。
  Future<void> _copyIcon(IconEntry entry) async {
    final code = 'TIcon(TIcons.${entry.key})';
    await Clipboard.setData(ClipboardData(text: code));
    if (!mounted) {
      return;
    }

    TToast.showSuccess(
      '已复制 $code',
      context: context,
      duration: const Duration(seconds: 2),
    );
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

    return Container(
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
      child: Column(
        children: [
          Semantics(
            label: '复制 ${entry.key} 图标',
            button: true,
            child: InkResponse(
              onTap: () => _copyIcon(entry),
              mouseCursor: SystemMouseCursors.click,
              radius: 44,
              child: Padding(
                padding: const EdgeInsets.all(8),
                child: TIcon(
                  entry.value,
                  size: 72,
                  color: _iconColor,
                  semanticLabel: entry.key,
                ),
              ),
            ),
          ),
          const SizedBox(height: 4),
          TText(
            entry.key,
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  /// 颜色选择区：默认色 + 六个色块，用于测试 [Icon] 的 color 属性。
  Widget _buildColorPicker(ThemeData theme) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
      child: Row(
        children: [
          _buildDefaultColorSwatch(theme),
          ...List.generate(_testColors.length, (index) {
            final color = _testColors[index];
            final isSelected = _iconColor == color;

            return Padding(
              padding: const EdgeInsets.only(left: 12),
              child: _buildColorSwatch(
                theme: theme,
                color: color,
                isSelected: isSelected,
                onTap: () => setState(() => _iconColor = color),
              ),
            );
          }),
        ],
      ),
    );
  }

  /// 默认颜色色块：不传 [Icon.color] 时使用主题色。
  Widget _buildDefaultColorSwatch(ThemeData theme) {
    final isSelected = _iconColor == null;
    final defaultColor = _resolveIconColor(theme)!;

    return Semantics(
      label: '选择默认颜色',
      button: true,
      selected: isSelected,
      child: InkWell(
        onTap: () => setState(() => _iconColor = null),
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
    required Color color,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return Semantics(
      label: '选择颜色',
      button: true,
      selected: isSelected,
      child: InkWell(
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
                  TIcon(entry.value, size: 28, color: _iconColor),
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
