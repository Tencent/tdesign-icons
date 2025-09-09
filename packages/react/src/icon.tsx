import classNames from 'classnames';
import {
  createElement,
  ReactElement,
  SVGAttributes,
  CSSProperties,
  forwardRef,
  Ref,
  useEffect,
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

/**
 * use react createElement to render an IconElement with other props
 */
function render(node: IconElement, id: string, rootProps: IconProps & {
  ref: Ref<SVGElement>
}): ReactElement {
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

function childRender(node: IconElement, childProps: IconProps, index: number): ReactElement {
  const processedAttrs: Record<string, any> = {};
  if (node.attrs) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(node.attrs)) {
      if (typeof value === 'string' && value.startsWith('props.')) {
        const propName = value.split('.')[1] as keyof IconProps;
        processedAttrs[key] = childProps[propName];
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

  useEffect(() => {
    loadStylesheet();
  }, []);

  return render(icon, `${id}`, {
    ref,
    className: cls,
    // fill none 是为了避免存在旧版本图标的 fill:currentColor 造成的样式污染
    style: { fill: 'none', ...style, ...sizeStyle },
    ...restProps,
  });
});
