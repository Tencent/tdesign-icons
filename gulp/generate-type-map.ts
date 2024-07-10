import { src, dest } from 'gulp';
import concat from 'gulp-concat';
import { createTransformStream } from './transform';
import { upperCamelCase } from './util';

function useItemTemplate() {
  function getItem(stem: string) {
    return `${upperCamelCase(stem)}Icon?: GlobalIconType`;
  }

  return createTransformStream((_, { stem: name }) => getItem(name));
}

function getReactWrapper(content: string) {
  return `import React from 'react';\n
export type GlobalIconType = React.ForwardRefExoticComponent<Record<string, unknown>> | (() => JSX.Element);
export type GlobalIconConfig = {
${content}
};
`;
}

function getVueWrapper(content: string) {
  return `export type GlobalIconType = () => JSX.Element;\n
export type GlobalIconConfig = {
${content}
};
`;
}

function useWrapperTemplate(type: 'react' | 'vue') {
  if (type === 'react') {
    return createTransformStream((content) => getReactWrapper(content));
  }

  return createTransformStream((content) => getVueWrapper(content));
}

// generate a type map for global icon replace config
export const generateTypeMap = ({
  from,
  to,
  type,
}: {
  from: string[];
  to: string;
  type: 'react' | 'vue' | 'web-components';
}) => function generateManifest() {
  return src(from)
    .pipe(useItemTemplate())
    .pipe(concat('NOT-VALID'))
    .pipe(useWrapperTemplate(type))
    .pipe(concat('global-config.ts'))
    .pipe(dest(to));
};
