import classNames from 'classnames';
import * as React from 'react';
import {
  createElement,
  ReactElement,
  SVGAttributes,
  CSSProperties,
  forwardRef,
  Ref,
  useEffect,
  useRef,
} from 'react';
import useSizeProps from './util/use-size-props';
import { loadStylesheet } from './util/check-url-and-load';

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  style?: CSSProperties;
  className?: string;
  size?: 'small' | 'medium' | 'large' | string | number;
  strokeWidth?: number;
  strokeColor?: string | string[];
  fillColor?: string | string[]
}
export interface Attrs {
  [key: string]: any;
}
export interface IconElement {
  tag: string;
  attrs: Attrs;
  children?: IconElement[];
}
export interface IconFulfilledProps extends IconProps {
  icon: IconElement;
  id: string;
}

let fallbackIdSeed = 0;

function useIconInstanceId() {
  const fallbackId = useRef<string | null>(null);
  if (!fallbackId.current) {
    fallbackId.current = `legacy${fallbackIdSeed}`;
    fallbackIdSeed += 1;
  }

  const useId = (React as any).useId as undefined | (() => string);
  const instanceId = useId ? useId() : fallbackId.current;
  return instanceId.replace(/[^a-zA-Z0-9_]/g, '') || fallbackId.current;
}

function resolveChildProp(value: string, childProps: Record<string, any>) {
  const propName = value.split('.')[1];
  const overlapMask = /^overlapMask(Id|Url)_(.+)$/.exec(propName);
  if (overlapMask) {
    const maskId = `${childProps.overlapMaskPrefix}-overlap-${overlapMask[2]}`;
    return overlapMask[1] === 'Url' ? `url(#${maskId})` : maskId;
  }

  return childProps[propName];
}

/**
 * use react createElement to render an IconElement with other props
 */
function render(node: IconElement, id: string, rootProps: IconProps & {
  ref: Ref<SVGElement>
}, overlapMaskPrefix: string): ReactElement {
  const {
    strokeColor = 'currentColor', strokeWidth = 2, fillColor = 'transparent', ...resetRootProps
  } = rootProps;

  // 填充图标处理
  let filledColor: string;
  if (!rootProps.fillColor) filledColor = 'currentColor';
  else filledColor = Array.isArray(fillColor) ? fillColor[0] : fillColor;
  const childProps = {
    strokeWidth,
    strokeColor1: Array.isArray(strokeColor) ? strokeColor[0] : strokeColor,
    strokeColor2: Array.isArray(strokeColor) ? strokeColor[1] ?? strokeColor[0] : strokeColor,
    fillColor1: Array.isArray(fillColor) ? fillColor[0] : fillColor,
    fillColor2: Array.isArray(fillColor) ? fillColor[1] ?? fillColor[0] : fillColor,
    filledColor,
    overlapMaskPrefix,
  };
  return createElement(
    node.tag,
    {
      key: id,
      ...node.attrs,
      ...resetRootProps,
    },
    (node.children || []).map((child, index) => childRender(child, childProps, index)),
  );
}

function childRender(node: IconElement, childProps: Record<string, any>, index: number): ReactElement {
  const processedAttrs: Record<string, any> = {};
  if (node.attrs) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(node.attrs)) {
      if (typeof value === 'string' && value.startsWith('props.')) {
        processedAttrs[key] = resolveChildProp(value, childProps);
      } else {
        processedAttrs[key] = value;
      }
    }
  }

  return createElement(
    node.tag,
    {
      key: index,
      ...processedAttrs,
    },
    (node.children || []).map((child, index) => childRender(child, childProps, index)),
  );
}

export const IconBase = forwardRef((props: IconFulfilledProps, ref: Ref<SVGElement>) => {
  const {
    icon, id, className, size, style, ...restProps
  } = props;
  const { className: sizeClassName, style: sizeStyle } = useSizeProps(size);
  const cls = classNames('t-icon', `t-icon-${id}`, className, sizeClassName);
  const instanceId = useIconInstanceId();
  const overlapMaskPrefix = `t-icon-${id}-instance-${instanceId}`;

  useEffect(() => {
    loadStylesheet();
  }, []);

  return render(icon, `${id}`, {
    ref,
    className: cls,
    // fill none 是为了避免存在旧版本图标的 fill:currentColor 造成的样式污染
    style: { fill: 'none', ...style, ...sizeStyle },
    ...restProps,
  }, overlapMaskPrefix);
});
