import decamelize from 'decamelize';
import { IconElement } from '../svg-info-check';

export function renderNode(node: IconElement): string {
  const { attrs } = node;

  let attrString = '';
  if (attrs) {
    if (attrs.className) {
      attrs.class = attrs.className;
      delete attrs.className;
    }

    const styleObj = attrs.style as { [key: string]: any } | undefined;
    if (styleObj) {
      const styles = Object.keys(styleObj).reduce((styles, styleKey) => {
        let destStyle = styles;
        destStyle += `${decamelize(styleKey)}: ${styleObj[styleKey]};`;
        return destStyle;
      }, '');

      attrs.style = styles.trim();
    }

    const attrArray = Object.keys(attrs).reduce((classes: string[], currentAttrKey) => {
      const val = attrs[currentAttrKey];
      classes.push(`${decamelize(currentAttrKey, { separator: '-' })}="${val}"`);
      return classes;
    }, []);

    if (attrArray.length) {
      attrString = ` ${attrArray.join(' ')}`;
    }
  }

  const childrenString = node.children?.map((child) => renderNode(child)).join('') ?? '';

  return `<${node.tag}${attrString}>${childrenString}</${node.tag}>`;
}
