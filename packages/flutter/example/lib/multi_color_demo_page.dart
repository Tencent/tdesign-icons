import 'package:flutter/material.dart';
import 'package:tdesign_flutter_icons/tdesign_flutter_icons.dart';

/// 多色 / 可变粗细 / 可变颜色图标示例页。
class MultiColorDemoPage extends StatefulWidget {
  const MultiColorDemoPage({super.key});

  @override
  State<MultiColorDemoPage> createState() => _MultiColorDemoPageState();
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
  double _strokeWidth = 2;
  ColorMode _colorMode = ColorMode.multiple;

  // 四通道默认颜色与 view 保持一致。
  Color _fillColor1 = const Color(0xFF02D8F2);
  Color _fillColor2 = const Color(0xFFFFAA75);
  Color _strokeColor1 = const Color(0xFF0262F8);
  Color _strokeColor2 = const Color(0xFF0262F8);

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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('多色图标 Demo')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('可变粗细: ${_strokeWidth.toStringAsFixed(1)}'),
                  const SizedBox(height: 8),
                  Slider(
                    value: _strokeWidth,
                    min: 0.5,
                    max: 4,
                    divisions: 14,
                    label: _strokeWidth.toStringAsFixed(1),
                    onChanged: (v) => setState(() => _strokeWidth = v),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),

          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('颜色操作', style: Theme.of(context).textTheme.titleSmall),
                  const SizedBox(height: 4),
                  Text(
                    '选择颜色模式后，为各通道挑选颜色（含透明度），图标实时更新',
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                  const SizedBox(height: 16),

                  SegmentedButton<ColorMode>(
                    segments: [
                      for (final mode in ColorMode.values)
                        ButtonSegment(value: mode, label: Text(mode.label)),
                    ],
                    selected: {_colorMode},
                    onSelectionChanged:
                        (selection) =>
                            setState(() => _colorMode = selection.first),
                  ),
                  const SizedBox(height: 16),

                  for (final channel in _visibleChannels) ...[
                    _ColorChannelRow(
                      label: channel.label,
                      color: _channelColor(channel),
                      onTap: () => _pickColor(channel),
                    ),
                    const SizedBox(height: 12),
                  ],
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),

          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('多色图标（fillColor + strokeColor）'),
                  const SizedBox(height: 16),
                  Wrap(
                    spacing: 20,
                    runSpacing: 20,
                    children: [
                      _DemoItem(
                        label: 'AiIcon（可变色）',
                        child: AiIcon(
                          size: 48,
                          fillColor1: _channelColor(_ColorChannel.fill1),
                          fillColor2: _channelColor(_ColorChannel.fill2),
                          strokeColor1: _channelColor(_ColorChannel.stroke1),
                          strokeColor2: _channelColor(_ColorChannel.stroke2),
                          strokeWidth: _strokeWidth,
                        ),
                      ),
                      _DemoItem(
                        label: 'AddressBookIcon',
                        child: AddressBookIcon(
                          size: 48,
                          fillColor1: _channelColor(_ColorChannel.fill1),
                          fillColor2: _channelColor(_ColorChannel.fill2),
                          strokeColor1: _channelColor(_ColorChannel.stroke1),
                          strokeColor2: _channelColor(_ColorChannel.stroke2),
                          strokeWidth: _strokeWidth,
                        ),
                      ),
                      _DemoItem(
                        label: 'AddCircleIcon',
                        child: AddCircleIcon(
                          size: 48,
                          fillColor1: _channelColor(_ColorChannel.fill1),
                          fillColor2: _channelColor(_ColorChannel.fill2),
                          strokeColor1: _channelColor(_ColorChannel.stroke1),
                          strokeColor2: _channelColor(_ColorChannel.stroke2),
                          strokeWidth: _strokeWidth,
                        ),
                      ),
                      _DemoItem(
                        label: 'AbstractIcon',
                        child: AbstractIcon(
                          size: 48,
                          fillColor1: _channelColor(_ColorChannel.fill1),
                          fillColor2: _channelColor(_ColorChannel.fill2),
                          strokeColor1: _channelColor(_ColorChannel.stroke1),
                          strokeColor2: _channelColor(_ColorChannel.stroke2),
                          strokeWidth: _strokeWidth,
                        ),
                      ),
                      _DemoItem(
                        label: 'LogoCnbIcon',
                        child: LogoCnbIcon(size: 48, color: _fillColor1),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
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

class _DemoItem extends StatelessWidget {
  const _DemoItem({required this.label, required this.child});

  final String label;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        child,
        const SizedBox(height: 4),
        Text(label, style: Theme.of(context).textTheme.labelSmall),
      ],
    );
  }
}
