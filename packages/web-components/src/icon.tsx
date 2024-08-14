import {
  Component, OmiDOMAttributes, VNode, createElement,
} from 'omi';
import classname from './util/classname';
import getSizeProps from './util/size-props';
import { getStylesheet } from './util/check-url-and-load';

export interface IconProps extends OmiDOMAttributes {
  style?: CSSStyleDeclaration;
  /**
   * 类名，叫cls是为了和className区分
   */
  cls?: string;
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

export class IconBase extends Component<IconProps> {
  static css = [getStylesheet()];

  static icon: VNode | null = null;

  static propTypes = {
    cls: String,
    size: String,
    style: Object,
  }

  render(props) {
    const {
      id,
      cls,
      size,
      style,
      ...restProps
    } = props;

    delete restProps.cls;
    delete (restProps as any)?.className;

    const { className: sizeClassName, style: sizeStyle } = getSizeProps(size);
    const combinCls = classname('t-icon', `t-icon-${id}`, cls, sizeClassName);
    return render((this.constructor as typeof IconBase).icon as VNode, `${id}`, {
      className: combinCls,
      style: { ...style, ...sizeStyle },
      ...restProps,
    });
  }
}
