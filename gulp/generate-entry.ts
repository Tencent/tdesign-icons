import { dest, src } from 'gulp';
import concat from 'gulp-concat';

import { createTransformStream } from './transform';
import { upperCamelCase } from './util';

export const generateEntry = ({ from, to, extName = '' }: { from: string; to: string; extName?: string }) =>
  function generateEntry() {
    return src(from).pipe(useEntryTemplate(extName)).pipe(concat('icons.ts')).pipe(dest(to));
  };

const template = `export { default as $ICON_NAMEIcon } from './components/$FILE_NAME`;
const useEntryTemplate = (extName: string) =>
  createTransformStream((_, { stem: name }) => {
    const templateWithExt = `${template + extName}';`;
    return templateWithExt.replace(/\$ICON_NAME/g, upperCamelCase(name)).replace(/\$FILE_NAME/g, name);
  });
