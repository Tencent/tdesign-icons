import type { VNode } from 'omi';
import type { IconElement } from '../../../gulp/svg-info-check';

export default function vnodeConvert(el: IconElement) {
  const omiNode:VNode = {
    attributes: el.attrs,
    nodeName: el.tag,
    children: [],
  };
  if (el?.children && el.children?.length > 0) {
    omiNode.children = el.children.map(vnodeConvert);
  }

  return omiNode;
}
