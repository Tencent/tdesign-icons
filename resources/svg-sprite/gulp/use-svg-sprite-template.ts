import path from 'path';
import fs from 'fs';

const template = fs.readFileSync(path.resolve(__dirname, 'template/index.js'), 'utf-8');

export function getSvgSpriteJSFile(): string {
  const svgContent = fs.readFileSync(path.resolve(__dirname, '../dist/symbol/svg/sprite.symbol.svg'), 'utf-8');
  return template.replace(/\$SVGSPRITE/g, svgContent).replace(/fill="#000"/g, 'fill="currentColor"');
}
