import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * Flutter 图标生成任务（接入根目录 gulp 统一流程）。
 *
 * 调用 `packages/flutter/tool/generate.dart` 生成：
 * - `lib/src/assets.g.dart`（iconfont 常量）
 * - `lib/src/svg_data.g.dart`（多色/可变粗细 SVG 数据）
 * - `lib/src/icons.g.dart`（具名图标组件，如 AiIcon / AddCircleIcon）
 * - `fonts/t.ttf`（iconfont 字体文件）
 *
 * 由于 `pnpm run generate` 会在所有 CI job 中执行，而 Dart/Flutter SDK 仅
 * 在 Flutter 相关 job 中存在，因此当检测不到 Flutter/Dart 环境时会打印提示
 * 并跳过，不影响其它端（React/Vue/SVG...）的生成流程。
 */

// packages/flutter 目录绝对路径
const flutterDir = path.resolve(__dirname, '..');

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

/**
 * 判断当前环境是否具备 Flutter/Dart 工具链。
 * 优先使用 fvm（与 .fvmrc 锁定的 Flutter 版本保持一致），回退 flutter/dart。
 * 返回统一命令前缀数组（如 ['fvm'] 或 []），不具备时返回 null。
 */
function resolveToolchain(): string[] | null {
  if (hasOnPath('fvm')) {
    return ['fvm'];
  }
  if (hasOnPath('flutter') && hasOnPath('dart')) {
    return [];
  }
  return null;
}

/**
 * 运行子进程并返回 Promise，透传 stdout/stderr。
 * @param prefix 命令前缀（fvm 场景为 ['fvm']，原生场景为 []）
 * @param sub    子命令名，如 'flutter' / 'dart'
 * @param args   子命令参数
 */
function run(prefix: string[], sub: string, args: string[]): Promise<void> {
  const cmd = prefix.length ? prefix[0] : sub;
  const fullArgs = prefix.length ? [...prefix.slice(1), sub, ...args] : args;

  return new Promise((resolve, reject) => {
    const child = spawn(cmd, fullArgs, {
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
        reject(new Error(`"${cmd} ${fullArgs.join(' ')}" exited with code ${code}`));
      }
    });
  });
}

/** Flutter 生成器是否已具备可运行的 package 解析（已执行过 pub get）。 */
function hasResolvedDeps(): boolean {
  return fs.existsSync(packageConfigPath);
}

export function flutterTask() {
  return async function runFlutterTask(): Promise<void> {
    const prefix = resolveToolchain();

    if (!prefix) {
      // eslint-disable-next-line no-console
      console.log(
        '[flutter] 未检测到 Flutter/Dart 环境，跳过 Flutter 图标生成。' +
          '（仅在安装 Flutter SDK 的环境下才会生成 Flutter 图标代码）',
      );
      return;
    }

    // 未执行过 pub get 时先安装依赖，保证 code_builder/dart_style/xml 等可解析
    if (!hasResolvedDeps()) {
      // eslint-disable-next-line no-console
      console.log('[flutter] 未检测到 package_config.json，先执行 flutter pub get...');
      await run(prefix, 'flutter', ['pub', 'get']);
    }

    // eslint-disable-next-line no-console
    console.log('[flutter] 生成 Flutter 图标代码...');
    await run(prefix, 'dart', ['run', 'tool/generate.dart']);
  };
}
