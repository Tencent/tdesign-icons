import 'package:flutter/material.dart';
import 'package:tdesign_flutter_icons/tdesign_flutter_icons.dart';

/// 多色 / 可变粗细 / 可变颜色图标示例页。
///
/// 展示通过具名图标组件（如 `AiIcon`、`AddCircleIcon`）使用多色图标，
/// 支持 fillColor1/fillColor2/strokeColor1/strokeColor2 四通道上色、
/// strokeWidth 可变粗细与颜色动态调节。
class MultiColorDemoPage extends StatefulWidget {
  const MultiColorDemoPage({super.key});

  @override
  State<MultiColorDemoPage> createState() => _MultiColorDemoPageState();
}

/// 可交互调节的颜色通道定义。
enum _ColorChannel {
  stroke1('描边 1'),
  stroke2('描边 2'),
  fill1('填充 1'),
  fill2('填充 2');

  const _ColorChannel(this.label);
  final String label;
}

/// 预设色板：演示颜色动态切换。
const List<Color> _palette = [
  Colors.blue,
  Colors.green,
  Colors.orange,
  Colors.purple,
  Colors.pink,
  Colors.teal,
  Colors.red,
  Colors.indigo,
  Colors.transparent,
];

class _MultiColorDemoPageState extends State<MultiColorDemoPage> {
  double _strokeWidth = 2;

  // 各通道当前颜色（可变颜色交互演示）。
  Color _strokeColor1 = Colors.blue;
  Color _strokeColor2 = Colors.green;
  Color _fillColor1 = Colors.transparent;
  Color _fillColor2 = Colors.transparent;

  void _setChannelColor(_ColorChannel channel, Color color) {
    setState(() {
      if (channel == _ColorChannel.stroke1) {
        _strokeColor1 = color;
      } else if (channel == _ColorChannel.stroke2) {
        _strokeColor2 = color;
      } else if (channel == _ColorChannel.fill1) {
        _fillColor1 = color;
      } else {
        _fillColor2 = color;
      }
    });
  }

  Color _channelColor(_ColorChannel channel) => switch (channel) {
        _ColorChannel.stroke1 => _strokeColor1,
        _ColorChannel.stroke2 => _strokeColor2,
        _ColorChannel.fill1 => _fillColor1,
        _ColorChannel.fill2 => _fillColor2,
      };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('多色图标 Demo')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // 可变粗细调节
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

          // 可变颜色调节
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('可变颜色',
                      style: Theme.of(context).textTheme.titleSmall),
                  const SizedBox(height: 4),
                  Text(
                    '点击色板为各通道切换颜色，图标实时更新',
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                  const SizedBox(height: 12),
                  for (final channel in _ColorChannel.values) ...[
                    _ChannelSelector(
                      channel: channel,
                      current: _channelColor(channel),
                      palette: _palette,
                      onSelected: (c) =>
                          _setChannelColor(channel, c),
                    ),
                    const SizedBox(height: 8),
                  ],
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),

          // 多色图标示例
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
                      // AiIcon：完全使用可变颜色变量，随色板选择实时更新
                      _DemoItem(
                        label: 'AiIcon（可变色）',
                        child: AiIcon(
                          size: 48,
                          fillColor1: _fillColor1,
                          fillColor2: _fillColor2,
                          strokeColor1: _strokeColor1,
                          strokeColor2: _strokeColor2,
                          strokeWidth: _strokeWidth,
                        ),
                      ),
                      _DemoItem(
                        label: 'AddressBookIcon',
                        child: AddressBookIcon(
                          size: 48,
                          fillColor1: Colors.blue.shade100,
                          fillColor2: Colors.orange.shade200,
                          strokeColor1: Colors.blue.shade700,
                          strokeColor2: Colors.orange.shade700,
                          strokeWidth: _strokeWidth,
                        ),
                      ),
                      _DemoItem(
                        label: 'AddCircleIcon',
                        child: AddCircleIcon(
                          size: 48,
                          fillColor1: Colors.green.shade100,
                          strokeColor1: Colors.green.shade700,
                          strokeColor2: Colors.green.shade400,
                          strokeWidth: _strokeWidth,
                        ),
                      ),
                      _DemoItem(
                        label: 'AbstractIcon',
                        child: AbstractIcon(
                          size: 48,
                          fillColor1: Colors.purple.shade100,
                          strokeColor1: Colors.purple.shade700,
                          strokeColor2: Colors.pink.shade400,
                          strokeWidth: _strokeWidth,
                        ),
                      ),
                      _DemoItem(
                        label: 'LogoCnbIcon',
                        child: LogoCnbIcon(
                          size: 48,
                          color: Colors.teal,
                        ),
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
}

class _ChannelSelector extends StatelessWidget {
  const _ChannelSelector({
    required this.channel,
    required this.current,
    required this.palette,
    required this.onSelected,
  });

  final _ColorChannel channel;
  final Color current;
  final List<Color> palette;
  final ValueChanged<Color> onSelected;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          width: 72,
          child: Text(channel.label,
              style: Theme.of(context).textTheme.bodyMedium),
        ),
        Expanded(
          child: Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              for (final color in palette)
                _ColorSwatch(
                  color: color,
                  selected: color == current,
                  onTap: () => onSelected(color),
                ),
            ],
          ),
        ),
      ],
    );
  }
}

class _ColorSwatch extends StatelessWidget {
  const _ColorSwatch({
    required this.color,
    required this.selected,
    required this.onTap,
  });

  final Color color;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final isTransparent = color == Colors.transparent;
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(6),
      child: Container(
        width: 28,
        height: 28,
        decoration: BoxDecoration(
          color: isTransparent ? Colors.white : color,
          border: Border.all(
            color: selected
                ? Theme.of(context).colorScheme.primary
                : Theme.of(context).dividerColor,
            width: selected ? 2 : 1,
          ),
          borderRadius: BorderRadius.circular(6),
        ),
        child: isTransparent
            ? const Center(
                child: Icon(Icons.not_interested, size: 16),
              )
            : null,
      ),
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
        Text(
          label,
          style: Theme.of(context).textTheme.labelSmall,
        ),
      ],
    );
  }
}
