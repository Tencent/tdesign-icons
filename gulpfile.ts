import fs from 'node:fs';

import { parallel, series } from 'gulp';

import { reactTask } from './packages/react/gulp';
import { svgTask } from './packages/svg/gulp';
import { vueTask } from './packages/vue/gulp';
import { vueNextTask } from './packages/vue-next/gulp';
// import { reactNativeTask } from './packages/react-native/gulp';

import { svgSpriteTask } from './resources/svg-sprite/gulp';
import { iconFontTask } from './resources/icon-font/gulp';

import { iconViewTask } from './packages/view/gulp';
import { wcTask } from './packages/web-components/gulp';
import { uniAppTask } from './packages/uniapp/gulp';
import { uniAppXTask } from './packages/uniapp-x/gulp';

const source: string[] = ['svg/*.svg'];

/**
 * 插件目录里的 changelog.md 是发布产物，从 .changelog/<version>.md 同步，避免两份拷贝漂移。
 *
 * README.md / LICENSE 直接放在插件目录里（插件目录本身就是发布单元），不需要同步。
 */
async function syncUniAppPluginDocs() {
  const packages = [
    { dir: 'uniapp', id: 'tdesign-icons-uniapp' },
    { dir: 'uniapp-x', id: 'tdesign-icons-uniapp-x' },
  ];

  for (const { dir, id } of packages) {
    const root = `packages/${dir}`;
    const plugin = `${root}/src/uni_modules/${id}`;

    const { version } = JSON.parse(fs.readFileSync(`${plugin}/package.json`, 'utf8'));
    const notes = `${root}/.changelog/${version}.md`;
    if (fs.existsSync(notes)) {
      const body = fs.readFileSync(notes, 'utf8').trimEnd();
      fs.writeFileSync(`${plugin}/changelog.md`, `## ${version}\n\n${body}\n`);
    }
  }
}

export default series(
  parallel(
    reactTask(source),
    vueTask(source),
    vueNextTask(source),
    svgTask(source),
    // reactNativeTask(),
    svgSpriteTask(),
    iconFontTask(),
    iconViewTask(),
    wcTask(source),
    uniAppTask(source),
    uniAppXTask(source),
  ),
  syncUniAppPluginDocs,
);
