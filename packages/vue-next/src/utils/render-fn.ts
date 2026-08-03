import { getCurrentInstance, h } from 'vue';
import { IconProps } from './types';

const camel2Kebab = (camelString:string) => {
  const covertArr = [
    'clipRule',
    'fillRule',
    'maskContentUnits',
    'maskType',
    'maskUnits',
    'strokeLinecap',
    'strokeWidth',
  ];
  if (covertArr.includes(camelString)) { return camelString.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase(); }
  return camelString;
};

const resolveChildProp = (value: string, props: Record<string, any>) => {
  const propName = value.split('.')[1] as keyof IconProps;
  const overlapMask = /^overlapMask(Id|Url)(\d+)$/.exec(propName);
  if (overlapMask) {
    const maskId = `${props.overlapMaskPrefix}-${overlapMask[2]}`;
    return overlapMask[1] === 'Url' ? `url(#${maskId})` : maskId;
  }

  return props[propName];
};

const renderNode = (node: any, props: Record<string, any>) => {
  // 处理属性中的props引用
  const processedAttrs:Record<string, any> = {};
  if (node.attrs) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(node.attrs)) {
      if (typeof value === 'string' && value.startsWith('props.')) {
        processedAttrs[camel2Kebab(key)] = resolveChildProp(value, props);
      } else {
        processedAttrs[camel2Kebab(key)] = value;
      }
    }
  }

  // 处理尺寸属性
  if (node.tag === 'svg') {
    processedAttrs.class = props.class;
    processedAttrs.style = props.style;
    processedAttrs.onClick = props.onClick;
  }

  // 递归处理子节点
  const children = node.children
    ? node.children.map((child:any) => renderNode(child, props))
    : [];

  return h(node.tag, processedAttrs, children);
};

export default (node: any, props: Record<string, any>) => {
  const overlapMaskPrefix = `t-icon-overlap-${getCurrentInstance()?.uid ?? 'unknown'}`;
  return renderNode(node, { ...props, overlapMaskPrefix });
};
