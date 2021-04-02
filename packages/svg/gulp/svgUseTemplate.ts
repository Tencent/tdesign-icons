import decamelize from 'decamelize';

import { IconElement } from '../../../gulp/svgInfoCheck';

export function svgGenIconFileContent({
    name,
    element,
}: {
    name: string;
    element: string;
}): string {
    return renderIcon(name, element);
}

function renderIcon(name: string, element: string) {
    const node = JSON.parse(element);

    let className = node.attrs?.className ?? '';
    className += ` t-icon t-icon-${name}`;
    className = className.trim();
    node.attrs = { ...node.attrs, className };

    return renderNode(node);
}

function renderNode(node: IconElement): string {
    const attrs = node.attrs;

    let attrString = '';
    if (attrs) {
        if (attrs.className) {
            attrs.class = attrs.className;
            delete attrs.className;
        }

        const styleObj = attrs.style as { [key: string]: any } | undefined;
        if (styleObj) {
            const styles = Object.keys(styleObj).reduce((styles, styleKey) => {
                styles += `${decamelize(styleKey)}: ${styleObj[styleKey]};`;
                return styles;
            }, '');

            attrs.style = styles.trim();
        }

        const attrArray = Object.keys(attrs).reduce(
            (classes: string[], currentAttrKey) => {
                const val = attrs[currentAttrKey];
                classes.push(
                    `${decamelize(currentAttrKey, { separator: '-' })}="${val}"`
                );
                return classes;
            },
            []
        );

        if (attrArray.length) {
            attrString = ' ' + attrArray.join(' ');
        }
    }

    const childrenString =
        node.children?.map((child) => renderNode(child)).join('') ?? '';

    return `<${node.tag}${attrString}>${childrenString}</${node.tag}>`;
}
