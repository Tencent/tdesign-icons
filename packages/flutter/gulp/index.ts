import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { series } from 'gulp';

import { generateIcons } from '../../../gulp/generate-icons';
import { flutterGetIconData } from './flutter-use-template';

/**
 * Flutter 图标生成任务（接入根目录 gulp 统一流程）。
 *
 * 分为两步：
 * 1. 复用根目录 gulp 的 `svgToElement` 管线（`replaceColor + propsString`）
 *    处理每个 SVG（颜色通道占位符 + 半透明重叠修复），
 *    通过 `flutter-use-template.ts` 生成 per-icon 的 SVG 数据 Dart 文件；
 * 2. 调用 `packages/flutter/tool/generate.dart` 聚合这些数据文件，生成：
 *    - `lib/src/svg_data.g.dart`（多色/可变粗细 SVG 数据 map）
 *    - `lib/src/icons.g.dart`（具名图标组件，如 AiIcon / AddCircleIcon）
 *    - `lib/src/assets.g.dart`（iconfont 常量）
 *    - `fonts/t.ttf`（iconfont 字体文件）
 *
 * 无 dart 环境（如仅构建 React/Vue 的 CI job）时跳过聚合，不影响其它端；
 * 但 SVG 数据仍会通过管线生成，供需要时使用。
 */

// packages/flutter 目录绝对路径
const flutterDir = path.resolve(__dirname, '..');

// gulp 管线生成的 per-icon SVG 数据目录
const svgDataTo = 'packages/flutter/tool/generated/svg';

const source: string[] = ['svg/*.svg'];

const packageConfigPath = path.join(flutterDir, '.dart_tool', 'package_config.json');

/** 判断 PATH 中是否存在指定可执行文件。 */
function hasOnPath(name: string): boolean {
  const pathDirs = (process.env.PATH || '').split(path.delimiter);
  return pathDirs.some((dir) => {
    if (!dir) return false;
    try {
      fs.accessSync(path.join(dir, name), fs.constants.X_OK);
      return true;
    } catch {
      return false;
    }
  });
}

/** 运行子进程并返回 Promise，透传 stdout/stderr。 */
function run(cmd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd: flutterDir,
      stdio: 'inherit',
      shell: false,
    });

    child.on('error', (error) => {
      reject(error);
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`"${cmd} ${args.join(' ')}" exited with code ${code}`));
      }
    });
  });
}

/** Flutter 生成器是否已具备可运行的 package 解析（已执行过 pub get）。 */
function hasResolvedDeps(): boolean {
  return fs.existsSync(packageConfigPath);
}

/**
 * 生成每个图标的 SVG 数据 Dart 文件（复用 gulp `svgToElement` 管线）。
 * 使用 `.dart` 扩展名，每个文件声明一个 `const String svg<Name>`。
 */
function generateFlutterSvgData() {
  return generateIcons({
    from: source,
    to: svgDataTo,
    iconGenerator: flutterGetIconData,
    extName: '.dart',
    options: {
      replaceColor: true,
      propsString: true,
      // 复用 gulp 管线内置的半透明重叠修复：默认仅对栅格化检测出重叠的
      // 图标（detectOpacityOverlaps）注入 <mask>，与 React/Vue 端行为一致。
    },
  });
}

export function flutterTask() {
  return series(
    generateFlutterSvgData(),
    async function runFlutterAggregate(): Promise<void> {
      // 无 dart 环境（如仅构建 React/Vue 的 CI job）时跳过聚合。
      if (!hasOnPath('dart')) {
        // eslint-disable-next-line no-console
        console.log('[flutter] 未检测到 dart 环境，跳过 Flutter 图标聚合。');
        return;
      }

      // 未执行过 pub get 时先安装依赖，保证 code_builder/dart_style 可解析
      if (!hasResolvedDeps()) {
        // eslint-disable-next-line no-console
        console.log('[flutter] 未检测到 package_config.json，先执行 flutter pub get...');
        await run('flutter', ['pub', 'get']);
      }

      // eslint-disable-next-line no-console
      console.log('[flutter] 生成 Flutter 图标代码...');
      await run('dart', ['run', 'tool/generate.dart']);
    },
  );
}
