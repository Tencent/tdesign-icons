import {
  VNode,
  Component,
  tag,
  createElement,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  h, // jsx use
} from 'omi';
import classNames, { getClassPrefix } from '../util/classname';
import getSizeProps from '../util/size-props';
import { loadScript, getStylesheet } from '../util/check-url-and-load';
import iconJson from './svg-icon';

import type { IconProps } from '../icon';

export interface SpriteIconProps extends IconProps {
  /**
   * 图标类型
   */
  name?: string;

  /**
   * 图标地址
   */
  url?: string | string[];

  /**
   * @default true
   */
  loadDefaultIcons?: boolean;
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

@tag('t-icon')
export class Icon extends Component<SpriteIconProps> {
  static css = [getStylesheet()];

  static defaultProps = {
    loadDefaultIcons: true,
  };

  static propTypes = {
    name: String,
    url: [String, Array],
    loadDefaultIcons: Boolean,
    cls: String,
    size: String,
    style: Object,
  }

  classPrefix = getClassPrefix();

  svgIconJson = iconJson;

  get class() {
    const {
      url, name, size, cls: customClassName,
    } = this.props;
    const iconName = url ? name : `${this.classPrefix}-icon-${name}`;
    const { className: sizeClassName } = getSizeProps(size);
    return classNames(`${this.classPrefix}-icon`, iconName, sizeClassName, customClassName);
  }

  install(): void {
    const { url } = this.props;
    const urls = Array.isArray(url) ? url : [url];
    (urls as Array<string>).forEach((url) => {
      loadScript(url, `${this.classPrefix}-svg-js-stylesheet--unique-class`, () => {
        this.svgIconJson = (window as any).TdesignWebComponentsIconJson;
        this.update();
      });
    });
  }

  render(props: SpriteIconProps) {
    const {
      name = '',
      size,
      style,
      ...restProps
    } = props;

    delete restProps.loadDefaultIcons;
    delete restProps.cls;
    delete (restProps as any)?.className;
    delete restProps.url;

    const { style: sizeStyle } = getSizeProps(size);

    try {
      const node = JSON.parse(this.svgIconJson?.[name] || '{}');
      return render(node, `${name}`, {
        className: this.class,
        style: { ...style, ...sizeStyle },
        ...restProps,
        part: 't-icon',
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
