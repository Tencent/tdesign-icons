import { dest, src } from 'gulp';
import concat from 'gulp-concat';
import { createTransformStream } from '../../../gulp/transform';
import { upperCamelCase } from '../../../gulp/util';

export const angularGenerateEntry = ({ from, to }: { from: string; to: string }) =>
  function generateEntry() {
    return src(from).pipe(getNamePair()).pipe(concat('icons.ts')).pipe(getEntranceFiles()).pipe(dest(to));
  };

const getNamePair = () => createTransformStream((_, { stem: name }) => `${upperCamelCase(name)},${name}\n`);

const getEntranceFiles = () =>
  createTransformStream((content) => {
    const icons = content
      .split('\n')
      .filter((i) => !!i)
      .map((i) => {
        const pair = i.split(',');
        return {
          name: pair[0],
          source: pair[1],
        };
      });

    const exports = icons
      .map(({ name, source }) => `export { TIcon${name} } from './components/${source}'`)
      .join(';\n');
    const imports = icons
      .map(({ name, source }) => `import { TIcon${name} } from './components/${source}'`)
      .join(';\n');
    const names = icons.map(({ name }) => `TIcon${name}`).join(',\n  ');

    return `${imports};

export const ICON_COMPONENTS = [
  ${names}
];

${exports}
`;
  });
