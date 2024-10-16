import {
  Component, OmiDOMAttributes, VNode, createElement,
} from 'omi';
import classname from './util/classname';
import getSizeProps from './util/size-props';
import { getStylesheet } from './util/check-url-and-load';

export interface IconProps extends OmiDOMAttributes {
  style?: CSSStyleDeclaration;
  innerStyle?: CSSStyleDeclaration;
  /**
   * 类名，叫innerClass是为了和最外层className区分
   */
  innerClass?: string;
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
 * use omi createElement to render an IconElement with other props
 */
function render(node: VNode, id: string, rootProps?: { [key: string]: any }): VNode {
  return createElement(
    node.nodeName as string,
    {
      key: id,
      ...node.attributes,
      ...rootProps,
    },
    (node.children || []).map((child, index) => {
      if (typeof child === 'string') return child;
      return render(child, `${id}-${node.nodeName}-${index}`);
    }),
  );
}

export class IconBase<T extends IconProps> extends Component<T> {
  static css = [getStylesheet()];

  static icon: VNode | null = null;

  static propTypes = {
    innerClass: String,
    innerStyle: Object,
    size: String,
  }

  render(props) {
    const {
      id,
      size,
      innerClass,
      innerStyle,
      ...restProps
    } = props;

    delete restProps.cls;
    delete (restProps as any)?.className;

    const { className: sizeClassName, style: sizeStyle } = getSizeProps(size);
    const combinCls = classname('t-icon', `t-icon-${id}`, sizeClassName, innerClass);
    return render((this.constructor as typeof IconBase).icon as VNode, `${id}`, {
      className: combinCls,
      style: { ...sizeStyle, ...innerStyle },
      ...restProps,
    });
  }
}
