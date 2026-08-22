import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

/// 颜色通道回退：当 `fill2` 未设置时回退到 `fill1`，再回退到 `color`。
///
/// 与 vue-next / react 的 `fillColor2 ?? fillColor1 ?? color` 规则保持一致。
Color _resolveChannel1(Color? channel1, Color color) => channel1 ?? color;

Color _resolveChannel2(Color? channel2, Color? channel1, Color color) =>
    channel2 ?? channel1 ?? color;

/// 将 [Color] 转换为 SVG 可用的十六进制颜色字符串。
String _colorToHex(Color color) {
  String toHex(double v) {
    final n = (v * 255).round().clamp(0, 255).toInt();
    return n.toRadixString(16).padLeft(2, '0');
  }

  final r = toHex(color.r);
  final g = toHex(color.g);
  final b = toHex(color.b);
  final a = toHex(color.a);

  if (a == 'ff') {
    return '#$r$g$b';
  }
  // SVG/CSS 颜色使用 #RRGGBBAA（alpha 在末尾），而 Dart Color 内部是 ARGB，
  // 因此这里必须把 alpha 放到最后，否则半透明颜色会被 SVG 渲染器错误解析。
  return '#$r$g$b$a';
}

/// 内部基础图标组件：负责将带占位符的 SVG 数据替换为实际颜色/粗细并渲染。
///
/// 该组件为**内部实现**，不通过包公共入口导出，请勿直接使用；
/// 具名图标组件（如 `AiIcon`）已封装了全部参数。
class IconBase extends StatelessWidget {
  const IconBase({
    super.key,
    required this.svgData,
    this.size,
    this.color,
    this.fillColor1,
    this.fillColor2,
    this.strokeColor1,
    this.strokeColor2,
    this.strokeWidth = 2,
  });

  /// 图标 SVG 数据（含占位符：`__FILL1__`、`__FILL2__`、`__STROKE1__`、`__STROKE2__`、
  /// `__COLOR__`、`__STROKE_WIDTH__`）。
  final String svgData;

  /// 图标尺寸（宽高）。不传时使用 SVG 原始尺寸。
  final double? size;

  /// 单色图标颜色（等效 `currentColor`），也是多色通道的默认回退色。
  final Color? color;

  /// fill 通道 1 颜色。
  final Color? fillColor1;

  /// fill 通道 2 颜色。
  final Color? fillColor2;

  /// stroke 通道 1 颜色。
  final Color? strokeColor1;

  /// stroke 通道 2 颜色。
  final Color? strokeColor2;

  /// 描边宽度，默认 2.0。
  final double strokeWidth;

  @override
  Widget build(BuildContext context) {
    final currentColor =
        color ?? Theme.of(context).iconTheme.color ?? Colors.black;

    final f1 = _resolveChannel1(fillColor1, currentColor);
    final f2 = _resolveChannel2(fillColor2, fillColor1, currentColor);
    final s1 = _resolveChannel1(strokeColor1, currentColor);
    final s2 = _resolveChannel2(strokeColor2, strokeColor1, currentColor);

    final processedSvg = svgData
        .replaceAll('__FILL1__', _colorToHex(f1))
        .replaceAll('__FILL2__', _colorToHex(f2))
        .replaceAll('__STROKE1__', _colorToHex(s1))
        .replaceAll('__STROKE2__', _colorToHex(s2))
        // __COLOR__ 用于填充型单色图标，对齐 vue-next 的 filledColor
        // （fillColor1 ?? currentColor）
        .replaceAll('__COLOR__', _colorToHex(f1))
        .replaceAll('__STROKE_WIDTH__', strokeWidth.toString());

    return SvgPicture.string(
      processedSvg,
      width: size,
      height: size,
    );
  }
}
