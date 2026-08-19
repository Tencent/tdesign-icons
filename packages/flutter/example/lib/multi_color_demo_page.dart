import 'package:flutter/material.dart';
import 'package:tdesign_flutter_icons/tdesign_flutter_icons.dart';

/// 多色 / 可变粗细图标示例页。
///
/// 展示通过具名图标组件（如 `AiIcon`、`AddCircleIcon`）使用多色图标，
/// 支持 fillColor1/fillColor2/strokeColor1/strokeColor2 四通道上色与 strokeWidth 可变粗细。
class MultiColorDemoPage extends StatefulWidget {
  const MultiColorDemoPage({super.key});

  @override
  State<MultiColorDemoPage> createState() => _MultiColorDemoPageState();
}

class _MultiColorDemoPageState extends State<MultiColorDemoPage> {
  double _strokeWidth = 2;

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
                      _DemoItem(
                        label: 'AiIcon',
                        child: AiIcon(
                          size: 48,
                          fillColor1: Colors.transparent,
                          fillColor2: Colors.transparent,
                          strokeColor1: Theme.of(context).colorScheme.primary,
                          strokeColor2: Theme.of(context).colorScheme.secondary,
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
