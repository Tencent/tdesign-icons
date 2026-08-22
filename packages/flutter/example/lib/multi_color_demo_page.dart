import 'package:flutter/material.dart';
import 'package:tdesign_flutter_icons/tdesign_flutter_icons.dart';

/// 多色 / 可变粗细 / 可变颜色图标示例页。
///
/// 对齐 `packages/view/src/icon-view.vue` 的交互：
/// - 展示**全部**多色图标（填充 / 非填充两类），复用 `svgDataMap` 动态渲染；
/// - 填充图标（`-filled` 后缀）与 **非填充图标** 通过开关切换；
/// - 提供可变粗细滑杆、单色/双色/多色颜色模式与自由取色；
/// - 提供「重置」操作，一键恢复默认颜色与粗细。
class MultiColorDemoPage extends StatefulWidget {
  const MultiColorDemoPage({super.key});

  @override
  State<MultiColorDemoPage> createState() => _MultiColorDemoPageState();
}

/// 图标类型（对齐 view 的 `currentType`：outline / filled）。
enum IconType {
  outline('非填充'),
  filled('填充');

  const IconType(this.label);
  final String label;
}

/// 颜色模式（对齐 view 的 `colorType`）。
enum ColorMode {
  single('单色'),
  double('双色'),
  multiple('多色');

  const ColorMode(this.label);
  final String label;
}

/// 可独立上色的颜色通道。
enum _ColorChannel {
  fill1('填充 1'),
  fill2('填充 2'),
  stroke1('描边 1'),
  stroke2('描边 2');

  const _ColorChannel(this.label);
  final String label;
}

class _MultiColorDemoPageState extends State<MultiColorDemoPage> {
  IconType _iconType = IconType.outline;
  double _strokeWidth = 2;
  ColorMode _colorMode = ColorMode.multiple;

  // 四通道默认颜色与 view 保持一致。
  Color _fillColor1 = const Color(0xFF02D8F2);
  Color _fillColor2 = const Color(0xFFFFAA75);
  Color _strokeColor1 = const Color(0xFF0262F8);
  Color _strokeColor2 = const Color(0xFF0262F8);

  /// 当前图标类型下的图标名列表（按名称排序）。
  List<String> get _currentIcons {
    final names = svgDataMap.keys
        .where(
          (name) => _iconType == IconType.filled
              ? name.endsWith('-filled')
              : !name.endsWith('-filled'),
        )
        .toList()
      ..sort();
    return names;
  }

  /// 当前模式下实际应用到各通道的颜色。
  /// 单色全部回退到同一颜色，双色按 fill/stroke 分组，多色各自独立。
  Color _channelColor(_ColorChannel channel) {
    switch (_colorMode) {
      case ColorMode.single:
        return _fillColor1;
      case ColorMode.double:
        return (channel == _ColorChannel.fill1 ||
                channel == _ColorChannel.fill2)
            ? _fillColor1
            : _strokeColor1;
      case ColorMode.multiple:
        return switch (channel) {
          _ColorChannel.fill1 => _fillColor1,
          _ColorChannel.fill2 => _fillColor2,
          _ColorChannel.stroke1 => _strokeColor1,
          _ColorChannel.stroke2 => _strokeColor2,
        };
    }
  }

  void _setChannelColor(_ColorChannel channel, Color color) {
    setState(() {
      switch (_colorMode) {
        case ColorMode.single:
          // 单色只改主填充色，其余通道通过回退规则跟随。
          _fillColor1 = color;
          break;
        case ColorMode.double:
          // 双色改填充主色 / 描边主色。
          if (channel == _ColorChannel.fill1 ||
              channel == _ColorChannel.fill2) {
            _fillColor1 = color;
          } else {
            _strokeColor1 = color;
          }
          break;
        case ColorMode.multiple:
          switch (channel) {
            case _ColorChannel.fill1:
              _fillColor1 = color;
              break;
            case _ColorChannel.fill2:
              _fillColor2 = color;
              break;
            case _ColorChannel.stroke1:
              _strokeColor1 = color;
              break;
            case _ColorChannel.stroke2:
              _strokeColor2 = color;
              break;
          }
          break;
      }
    });
  }

  /// 当前模式下需要展示的可独立上色通道。
  List<_ColorChannel> get _visibleChannels => switch (_colorMode) {
    ColorMode.single => const [_ColorChannel.fill1],
    ColorMode.double => const [_ColorChannel.fill1, _ColorChannel.stroke1],
    ColorMode.multiple => const [
      _ColorChannel.fill1,
      _ColorChannel.fill2,
      _ColorChannel.stroke1,
      _ColorChannel.stroke2,
    ],
  };

  /// 重置：恢复默认图标类型、颜色与粗细（对齐 view 的 `handleReset`）。
  void _reset() {
    setState(() {
      _iconType = IconType.outline;
      _strokeWidth = 2;
      _colorMode = ColorMode.multiple;
      _fillColor1 = const Color(0xFF02D8F2);
      _fillColor2 = const Color(0xFFFFAA75);
      _strokeColor1 = const Color(0xFF0262F8);
      _strokeColor2 = const Color(0xFF0262F8);
    });
  }

  /// 打开自由颜色选择器为指定通道挑选颜色。
  Future<void> _pickColor(_ColorChannel channel) async {
    final selected = await showDialog<Color>(
      context: context,
      builder:
          (context) => _ColorPickerDialog(
            title: '选择${channel.label}颜色',
            initial: _channelColor(channel),
          ),
    );
    if (selected != null) {
      _setChannelColor(channel, selected);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isFilled = _iconType == IconType.filled;

    return Scaffold(
      appBar: AppBar(title: const Text('多色图标 Demo')),
      body: Column(
        children: [
          _buildControls(context, isFilled: isFilled),
          const Divider(height: 1),
          Expanded(child: _buildIconGrid(context)),
        ],
      ),
    );
  }

  /// 顶部控制区：图标类型、可变粗细、颜色操作与重置。
  Widget _buildControls(BuildContext context, {required bool isFilled}) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 填充 / 非填充切换（对齐 view 的 currentType）
          Row(
            children: [
              Text('图标类型', style: Theme.of(context).textTheme.titleSmall),
              const Spacer(),
              SegmentedButton<IconType>(
                segments: [
                  for (final type in IconType.values)
                    ButtonSegment(value: type, label: Text(type.label)),
                ],
                selected: {_iconType},
                onSelectionChanged: (selection) {
                  setState(() => _iconType = selection.first);
                },
              ),
            ],
          ),
          const SizedBox(height: 12),

          // 可变粗细：非填充图标才支持（对齐 view）
          if (!isFilled) ...[
            Row(
              children: [
                Text(
                  '可变粗细: ${_strokeWidth.toStringAsFixed(1)}',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ],
            ),
            Slider(
              value: _strokeWidth,
              min: 0.5,
              max: 4,
              divisions: 14,
              label: _strokeWidth.toStringAsFixed(1),
              onChanged: (v) => setState(() => _strokeWidth = v),
            ),
            const SizedBox(height: 8),
          ],

          Text('颜色操作', style: Theme.of(context).textTheme.titleSmall),
          const SizedBox(height: 4),
          Text(
            '选择颜色模式后，为各通道挑选颜色（含透明度），图标实时更新',
            style: Theme.of(context).textTheme.bodySmall,
          ),
          const SizedBox(height: 12),

          SegmentedButton<ColorMode>(
            segments: [
              for (final mode in ColorMode.values)
                ButtonSegment(value: mode, label: Text(mode.label)),
            ],
            selected: {_colorMode},
            onSelectionChanged:
                (selection) => setState(() => _colorMode = selection.first),
          ),
          const SizedBox(height: 12),

          for (final channel in _visibleChannels) ...[
            _ColorChannelRow(
              label: channel.label,
              color: _channelColor(channel),
              onTap: () => _pickColor(channel),
            ),
            const SizedBox(height: 8),
          ],

          const SizedBox(height: 8),
          Align(
            alignment: Alignment.centerLeft,
            child: OutlinedButton.icon(
              onPressed: _reset,
              icon: const Icon(Icons.refresh),
              label: const Text('重置'),
            ),
          ),
        ],
      ),
    );
  }

  /// 图标网格：当前类型下的全部多色图标，复用 [IconBase] 动态渲染。
  Widget _buildIconGrid(BuildContext context) {
    final icons = _currentIcons;
    if (icons.isEmpty) {
      return const Center(child: Text('未找到图标'));
    }

    final isFilled = _iconType == IconType.filled;
    final fillColor = _channelColor(_ColorChannel.fill1);
    final fillColor2 = _channelColor(_ColorChannel.fill2);
    final strokeColor = _channelColor(_ColorChannel.stroke1);
    final strokeColor2 = _channelColor(_ColorChannel.stroke2);

    return LayoutBuilder(
      builder: (context, constraints) {
        final desktop = constraints.maxWidth >= 600;
        final gridDelegate = desktop
            ? const SliverGridDelegateWithMaxCrossAxisExtent(
                maxCrossAxisExtent: 96,
                mainAxisSpacing: 10,
                crossAxisSpacing: 10,
                childAspectRatio: 0.9,
              )
            : const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 4,
                mainAxisSpacing: 8,
                crossAxisSpacing: 8,
                childAspectRatio: 0.8,
              );

        return GridView.builder(
          padding: EdgeInsets.all(desktop ? 16 : 12),
          gridDelegate: gridDelegate,
          itemCount: icons.length,
          itemBuilder: (context, index) {
            final name = icons[index];
            final svg = svgDataMap[name];
            if (svg == null) {
              return const SizedBox.shrink();
            }
            return Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                IconBase(
                  svgData: svg,
                  size: desktop ? 32 : 28,
                  fillColor1: fillColor,
                  fillColor2: fillColor2,
                  strokeColor1: strokeColor,
                  strokeColor2: strokeColor2,
                  strokeWidth: isFilled ? 2 : _strokeWidth,
                ),
                const SizedBox(height: 4),
                Text(
                  name,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  textAlign: TextAlign.center,
                  style: Theme.of(context).textTheme.labelSmall?.copyWith(
                    fontSize: desktop ? 10 : 8,
                  ),
                ),
              ],
            );
          },
        );
      },
    );
  }
}

/// 单个颜色通道的展示行，点击打开颜色选择器。
class _ColorChannelRow extends StatelessWidget {
  const _ColorChannelRow({
    required this.label,
    required this.color,
    required this.onTap,
  });

  final String label;
  final Color color;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final isTransparent = color.a == 0;
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(8),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        decoration: BoxDecoration(
          border: Border.all(color: Theme.of(context).dividerColor),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Row(
          children: [
            Container(
              width: 28,
              height: 28,
              decoration: BoxDecoration(
                color: isTransparent ? Colors.white : color,
                border: Border.all(
                  color: Theme.of(context).dividerColor,
                  width: 1,
                ),
                borderRadius: BorderRadius.circular(6),
              ),
              child:
                  isTransparent
                      ? const Center(
                        child: Icon(
                          Icons.not_interested,
                          size: 16,
                          color: Colors.black54,
                        ),
                      )
                      : null,
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(label, style: Theme.of(context).textTheme.bodyMedium),
            ),
            Text(_toHex(color), style: Theme.of(context).textTheme.bodySmall),
            const SizedBox(width: 4),
            const Icon(Icons.edit, size: 16),
          ],
        ),
      ),
    );
  }
}

/// 将 [Color] 转为 `#RRGGBB`（不透明）或 `#RRGGBBAA`（半透明）。
String _toHex(Color color) {
  String toHex(double v) =>
      (v * 255).round().clamp(0, 255).toInt().toRadixString(16).padLeft(2, '0');
  final hex = '#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}';
  return color.a == 1 ? hex : '$hex${toHex(color.a)}';
}

/// 自由颜色选择器对话框，支持任意颜色与透明度调节。
class _ColorPickerDialog extends StatefulWidget {
  const _ColorPickerDialog({required this.title, required this.initial});

  final String title;
  final Color initial;

  @override
  State<_ColorPickerDialog> createState() => _ColorPickerDialogState();
}

class _ColorPickerDialogState extends State<_ColorPickerDialog> {
  late HSVColor _hsv;
  late double _alpha;

  @override
  void initState() {
    super.initState();
    final hsv = HSVColor.fromColor(widget.initial);
    _hsv = HSVColor.fromAHSV(
      hsv.alpha,
      hsv.hue,
      hsv.saturation.clamp(0.0, 1.0),
      hsv.value.clamp(0.0, 1.0),
    );
    _alpha = widget.initial.a;
  }

  Color get _color => _hsv.toColor().withValues(alpha: _alpha);

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(widget.title),
      content: SizedBox(
        width: 320,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: _color,
                    border: Border.all(color: Theme.of(context).dividerColor),
                    borderRadius: BorderRadius.circular(6),
                  ),
                ),
                const SizedBox(width: 12),
                Text(
                  _toHex(_color),
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ],
            ),
            const SizedBox(height: 16),

            Text('色相', style: Theme.of(context).textTheme.bodySmall),
            Slider(
              value: _hsv.hue,
              min: 0,
              max: 360,
              onChanged: (v) => setState(() => _hsv = _hsv.withHue(v)),
            ),

            Text('饱和度', style: Theme.of(context).textTheme.bodySmall),
            Slider(
              value: _hsv.saturation,
              min: 0,
              max: 1,
              onChanged: (v) => setState(() => _hsv = _hsv.withSaturation(v)),
            ),

            Text('明度', style: Theme.of(context).textTheme.bodySmall),
            Slider(
              value: _hsv.value,
              min: 0,
              max: 1,
              onChanged: (v) => setState(() => _hsv = _hsv.withValue(v)),
            ),

            Text('透明度', style: Theme.of(context).textTheme.bodySmall),
            Slider(
              value: _alpha,
              min: 0,
              max: 1,
              onChanged: (v) => setState(() => _alpha = v),
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('取消'),
        ),
        TextButton(
          onPressed: () => Navigator.pop(context, _color),
          child: const Text('确定'),
        ),
      ],
    );
  }
}
