import { src, dest } from 'gulp';
import concat from 'gulp-concat';
import { createTransformStream } from './transform';
import { upperCamelCase } from './util';

function useItemTemplate() {
  function getItem(stem: string) {
    return `${upperCamelCase(stem)}Icon?: React.ForwardRefExoticComponent<Record<string, unknown>> | (() => JSX.Element);`;
  }

  return createTransformStream((_, { stem: name }) => getItem(name));
}

function useWrapperTemplate() {
  function getWrapper(content: string) {
    return `import React from 'react';\n
export type GlobalIconConfig = {
${content}
};
`;
  }

  return createTransformStream((content) => getWrapper(content));
}

// generate a type map for global icon replace config
export const generateTypeMap = ({ from, to }: { from: string[]; to: string }) => function generateManifest() {
  return src(from)
    .pipe(useItemTemplate())
    .pipe(concat('NOT-VALID'))
    .pipe(useWrapperTemplate())
    .pipe(concat('global-config.ts'))
    .pipe(dest(to));
};
