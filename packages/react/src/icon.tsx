import classNames from 'classnames';
import {
  createElement,
  forwardRef,
  ForwardRefExoticComponent,
  ReactElement,
  Ref,
  RefAttributes,
  MouseEventHandler,
  CSSProperties,
} from 'react';
import useSizeProps from './iconfont/use-size-props';

export interface IconProps {
  focusable?: string;
  style?: CSSProperties;
  className?: string;
  size?: 'small' | 'middle' | 'large' | string | number;
  onClick?: MouseEventHandler<SVGSVGElement>;
}

export interface IconFulfilledProps extends IconProps {
  icon: IconElement;
  id: string;
}

export interface Attrs {
  [key: string]: any;
}

export interface IconElement {
  tag: string;
  attrs: Attrs;
  children?: IconElement[];
}

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757
export type CompoundedComponent = ForwardRefExoticComponent<IconFulfilledProps & RefAttributes<SVGElement>>;

export const IconBase = forwardRef((props: IconFulfilledProps, ref: Ref<SVGElement>) => {
  const { icon, id, className, size = 'middle', style, ...restProps } = props;
  const { className: sizeClassName, style: sizeStyle } = useSizeProps(size);
  const cls = classNames('t-icon', `t-icon-${id}`, className, sizeClassName);

  return render(icon, `${id}`, {
    ref,
    className: cls,
    style: { ...style, ...sizeStyle },
    ...restProps,
  });
}) as CompoundedComponent;

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

IconBase.displayName = 'TIconBase';
