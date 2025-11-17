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
  strokeWidth?: number;
  strokeColor?: string | string[];
  fillColor?: string | string[];
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
function render(node: VNode, id: string, rootProps?: { [key: string]: any }, childProps?: { [key: string]: any }): VNode {
  return createElement(
    node.nodeName as string,
    {
      key: id,
      ...node.attributes,
      ...rootProps,
    },
    (node.children || []).map((child, index) => {
      if (typeof child === 'string') return child;
      return childRender(child, `${id}-${node.nodeName}-${index}`, childProps);
    }),
  );
}

function childRender(node: VNode, id: string, childProps?: { [key: string]: any }): VNode {
  const processedAttrs: Record<string, any> = {};
  if (node.attributes) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(node.attributes)) {
      if (typeof value === 'string' && value.startsWith('props.')) {
        const propName = value.split('.')[1] as keyof IconProps;
        processedAttrs[key] = childProps?.[propName];
      } else {
        processedAttrs[key] = value;
      }
    }
  }

  return createElement(
    node.nodeName as string,
    {
      key: id,
      ...processedAttrs,
    },
    (node.children || []).map((child, index) => {
      if (typeof child === 'string') return child;
      return childRender(child, `${id}-${node.nodeName}-${index}`, childProps);
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
    strokeWidth: Number,
    strokeColor: [Array, String],
    fillColor: [Array, String],
  }

  render(props) {
    const {
      id,
      size,
      innerClass,
      innerStyle,
      strokeWidth = 2,
      strokeColor = 'currentColor',
      fillColor = 'transparent',
      ...restProps
    } = props;

    delete restProps.cls;
    delete (restProps as any)?.className;

    // 填充图标处理
    let filledColor: string;
    if (!props.fillColor) filledColor = 'currentColor';
    else filledColor = Array.isArray(fillColor) ? fillColor[0] : fillColor;

    const childProps = {
      strokeWidth,
      strokeColor1: Array.isArray(strokeColor) ? strokeColor[0] : strokeColor,
      strokeColor2: Array.isArray(strokeColor) ? strokeColor[1] ?? strokeColor[0] : strokeColor,
      fillColor1: Array.isArray(fillColor) ? fillColor[0] : fillColor,
      fillColor2: Array.isArray(fillColor) ? fillColor[1] ?? fillColor[0] : fillColor,
      filledColor,
    };

    const { className: sizeClassName, style: sizeStyle } = getSizeProps(size);
    const combinCls = classname('t-icon', `t-icon-${id}`, sizeClassName, innerClass);
    return render((this.constructor as typeof IconBase).icon as VNode, `${id}`, {
      className: combinCls,
      style: { fill: 'none', ...sizeStyle, ...innerStyle },
      ...restProps,
    }, childProps);
  }
}
