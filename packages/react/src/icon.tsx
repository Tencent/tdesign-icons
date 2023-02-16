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
function render(node: IconElement, id: string, rootProps?: { [key: string]: any }): ReactElement {
  return createElement(
    node.tag,
    {
      key: id,
      ...node.attrs,
      ...rootProps,
    },
    (node.children || []).map((child, index) => render(child, `${id}-${node.tag}-${index}`)),
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
    style: { ...style, ...sizeStyle },
    ...restProps,
  });
});
