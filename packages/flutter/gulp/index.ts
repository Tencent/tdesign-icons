import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * Flutter 图标生成任务（接入根目录 gulp 统一流程）。
 *
 * 通过 JS 脚本（Node 子进程）调用 `packages/flutter/tool/generate.dart` 生成文件：
 * - `lib/src/assets.g.dart`（iconfont 常量）
 * - `lib/src/svg_data.g.dart`（多色/可变粗细 SVG 数据）
 * - `lib/src/icons.g.dart`（具名图标组件，如 AiIcon / AddCircleIcon）
 * - `fonts/t.ttf`（iconfont 字体文件）
 *
 * 这里仅负责"生成文件"，不涉及工具链解析等复杂逻辑：当环境中存在 dart 命令
 * 时直接调用生成；不存在（如仅构建 React/Vue 的 CI job）时跳过，不影响其它端。
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

export function flutterTask() {
  return async function runFlutterTask(): Promise<void> {
    // 无 dart 环境（如仅构建 React/Vue 的 CI job）时跳过。
    if (!hasOnPath('dart')) {
      // eslint-disable-next-line no-console
      console.log('[flutter] 未检测到 dart 环境，跳过 Flutter 图标生成。');
      return;
    }

    // 未执行过 pub get 时先安装依赖，保证 code_builder/dart_style/xml 等可解析
    if (!hasResolvedDeps()) {
      // eslint-disable-next-line no-console
      console.log('[flutter] 未检测到 package_config.json，先执行 flutter pub get...');
      await run('flutter', ['pub', 'get']);
    }

    // eslint-disable-next-line no-console
    console.log('[flutter] 生成 Flutter 图标代码...');
    await run('dart', ['run', 'tool/generate.dart']);
  };
}
