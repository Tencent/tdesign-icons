import fs from 'fs-extra';
import path from 'path';
import camelCase from 'camelcase';

export { renderNode } from './render';

export function upperCamelCase(name: string) {
  const cased = camelCase.apply(camelCase, [name]);
  return cased.charAt(0).toUpperCase() + cased.slice(1);
}

export function allSubDirsForLevel(rootPath: string, relativeLevel: number): string[] {
  let currentLoads: string[] = [];
  let nextLoads: string[] = [];
  let currentLevel = 0;

  currentLoads.push(rootPath);

  while (true) {
    if (currentLevel === relativeLevel) {
      return currentLoads;
    }

    if (currentLoads.length) {
      const cur = currentLoads.shift()!;
      const subDirs = fs
        .readdirSync(cur)
        .map((child: string) => path.resolve(cur, child))
        .filter((child: string) => fs.statSync(child).isDirectory());

      nextLoads.push(...subDirs);
    } else {
      currentLoads = nextLoads;
      nextLoads = [];
      currentLevel += 1;
    }
  }
}

export function svgFilesUnder(path: string): string {
  return `${path}/*.svg`;
}
