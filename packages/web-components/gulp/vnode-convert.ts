import type { VNode } from 'omi';
import type { IconElement } from '../../../gulp/svg-info-check';

const convertAttributes = (attrs: Record<string, string | object>) => Object.keys(attrs).reduce((acc: Record<string, string | object>, key) => {
  const value = attrs[key];
  if (key === 'fillRule') {
    acc['fill-rule'] = value;
  } else if (key === 'clipRule') {
    acc['clip-rule'] = value;
  } else if (key === 'strokeWidth') {
    acc['stroke-width'] = value;
  } else if (key === 'strokeLinecap') {
    acc['stroke-linecap'] = value;
  } else {
    acc[key] = value;
  }
  return acc;
}, {});

export default function vnodeConvert(el: IconElement) {
  const omiNode: VNode = {
    attributes: convertAttributes(el.attrs),
    nodeName: el.tag,
    children: [],
  };
  if (el?.children && el.children?.length > 0) {
    omiNode.children = el.children.map(vnodeConvert);
  }

  return omiNode;
}
