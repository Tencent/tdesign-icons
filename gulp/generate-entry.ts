import { dest, src } from 'gulp';
import concat from 'gulp-concat';
import header from 'gulp-header';

import { createTransformStream } from './transform';
import { upperCamelCase } from './util';

const useEntryTemplate = (template: string) => createTransformStream((_, { stem: name }) => template.replace(/\$ICON_NAME/g, upperCamelCase(name)).replace(/\$FILE_NAME/g, name));

export const generateEntry = ({
  from,
  to,
  extName = '',
  withStyle = false,
}: {
  from: string;
  to: string;
  extName?: string;
  withStyle?: boolean;
}) => function generateEntry() {
  if (!withStyle) {
    const template = 'export { default as $ICON_NAMEIcon } from \'./components/$FILE_NAME';
    const templateWithExt = `${template + extName}';`;
    return src(from).pipe(useEntryTemplate(templateWithExt)).pipe(concat('icons.ts')).pipe(dest(to));
  }
  const template = `import { default as _$ICON_NAMEIcon } from './components/$FILE_NAME';\nexport const $ICON_NAMEIcon
      = _$ICON_NAMEIcon;`;

  return src(from)
    .pipe(useEntryTemplate(template))
    .pipe(concat('icons.ts'))
    .pipe(header('import \'./style/index.css\';\n'))
    .pipe(dest(to));
};
