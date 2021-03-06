import { src, dest } from 'gulp';
import concat from 'gulp-concat';

import { createTransformStream } from './transform';
import { upperCamelCase } from './util';

/**
 * generate a manifest for each sub folder under <root>/svg
 *
 * e.g.
 * export const <groupName> = [
 *   { stem: <kebab-name>, icon: <CamelName> },
 * ]
 */
export const generateManifest = ({ from, to }: { from: string[]; to: string }) =>
  function generateManifest() {
    return src(from)
      .pipe(useItemTemplate())
      .pipe(concat('NOT-VALID'))
      .pipe(useWrapperTemplate())
      .pipe(concat('manifest.ts'))
      .pipe(dest(to));
  };

function useItemTemplate() {
  function getItem(stem: string) {
    return `    { stem: "${stem}", icon: "${upperCamelCase(stem)}" },`;
  }

  return createTransformStream((_, { stem: name }) => getItem(name));
}

function useWrapperTemplate() {
  function getWrapper(content: string) {
    return `export const manifest = [
${content}
];
`;
  }

  return createTransformStream((content) => getWrapper(content));
}
