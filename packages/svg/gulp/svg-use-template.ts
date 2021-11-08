import { renderNode } from '../../../gulp/util/render';

function renderIcon(name: string, element: string) {
  const node = JSON.parse(element);

  let className = node.attrs?.className ?? '';
  className += ` t-icon t-icon-${name}`;
  className = className.trim();
  node.attrs = { ...node.attrs, className };

  return renderNode(node);
}

export function svgGenIconFileContent({ name, element }: { name: string; element: string }): string {
  return renderIcon(name, element);
}
