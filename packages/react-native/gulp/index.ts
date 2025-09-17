import { series } from 'gulp';

import { transform } from '@svgr/core';
import fs from 'fs-extra';
import path from 'path';
import { clearDir } from '../../../gulp/clean-dir';
import { upperCamelCase } from '../../../gulp/util';

const svgDir = path.join(__dirname, '../../../svg');
const srcDir = path.join(__dirname, '../src');
const componentsDir = path.join(__dirname, '../src/components');

const parseName = (name: string) => ({
  name,
  componentName: upperCamelCase(name),
});

const getIcons = () => {
  const isFile = (fileName: string) => fs.lstatSync(fileName).isFile();

  const list = fs.readdirSync(svgDir).map((fileName: string) => path.join(svgDir, fileName))
    .filter(isFile);

  const nameList = list.map((path: any) => path.match(/svg\/(\S*).svg/)?.[1]).filter((name) => !!name);
  return nameList;
};

const generateIconsIndex = () => {
  fs.ensureDirSync(srcDir);

  const initialTypeDefinitions = `import { ComponentType, SVGAttributes } from 'react';

interface Props extends SVGAttributes<SVGElement> {
  className?: string;
  fill?: string;
  stroke?: string;
  strokeWith?: number;
  width?: string | number;
  height?: string | number;
}

type Icon = ComponentType<Props>;
`;

  fs.writeFileSync(path.join(srcDir, 'index.js'), '', 'utf-8');
  fs.writeFileSync(
    path.join(srcDir, 'index.d.ts'),
    initialTypeDefinitions,
    'utf-8',
  );
};

const generateIconCode = async ({ name }: {name: string}) => {
  fs.ensureDirSync(componentsDir);

  const names = parseName(name);

  const location = path.join(svgDir, `${names.name}.svg`);
  const destination = path.join(componentsDir, `${names.name}.js`);
  const svgCode = fs.readFileSync(location, 'utf-8');
  const ComponentName = `${names.componentName}Icon`;

  const styleSvgCode = await transform(svgCode, {
    plugins: ['@svgr/plugin-svgo'],
    svgo: true,
    svgoConfig: {
      plugins: [
        {
          name: 'addAttributesToSVGElement',
          params: {
            attributes: [
              {
                color: 'rgba(0, 0, 0, 0.9)',
              },
            ],
          },
        },
        {
          name: 'removeAttrs',
          params: {
            attrs: [
              'fill-opacity',
            ],
          },
        },
      ],
    },
  });

  const rnCode = await transform(
    styleSvgCode,
    {
      plugins: [
        '@svgr/plugin-jsx',
        '@svgr/plugin-prettier',
      ],
      replaceAttrValues: {
        black: 'currentColor',
      },
      native: true,
      exportType: 'named',
      namedExport: ComponentName,
      prettier: true,
      prettierConfig: {
        singleQuote: true,
        openingBraceNewLine: true,
      },
    },
    { componentName: ComponentName },
  );
  // eslint-disable-next-line no-useless-concat
  const rnComponentCode = `${rnCode}\n` + `export default ${ComponentName};
`;

  fs.writeFileSync(destination, rnComponentCode, 'utf-8');

  return { ComponentName, name: names.name };
};

const appendToIconsIndex = ({ ComponentName, name }: { ComponentName:string, name:string }) => {
  const exportStringRn = `export { ${ComponentName} } from './components/${name}';\r\n`;
  fs.appendFileSync(
    path.join(srcDir, 'index.js'),
    exportStringRn,
    'utf-8',
  );
  const exportTypeString = `export const ${ComponentName}: Icon;\n`;
  fs.appendFileSync(
    path.join(srcDir, 'index.d.ts'),
    exportTypeString,
    'utf-8',
  );
};

export function reactNativeTask() {
  return series(
    clearDir(['packages/react-native/src']),
    (cb) => {
      generateIconsIndex();

      const icons = getIcons();
      icons.forEach((name: string) => {
        generateIconCode({ name })
          .then(({ ComponentName, name }) => {
            appendToIconsIndex({ ComponentName, name });
          });
      });
      cb();
    },
  );
}
