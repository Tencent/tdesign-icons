import type { OmiProps } from 'omi';
import {
  Component,
  tag,
  // @ts-ignore
  h,
} from 'omi';
import classNames, { getClassPrefix } from '../util/classname';
import { getStylesheet } from '../util/check-url-and-load';
import getSizeProps from '../util/size-props';
import { IconProps } from '../icon';
import fontJson from './font-icon.json';

export interface IconFontProps extends IconProps {
  /**
   * 图标类型
   */
  name?: string;

  /**
   * 尺寸
   * @default undefined
   */
  size?: 'small' | 'medium' | 'large' | string | number;

  /**
   * 渲染容器元素
   * @default 'i'
   */
  tag?: 'i' | 'span' | 'div';

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
 * 图标组件
 * iconfont 版本
 */
@tag('t-icon-font')
export default class IconFont extends Component<IconFontProps> {
  static css = [
    `.t-icon {
      /* use !important to prevent issues with browser extensions that change fonts */
      font-family: "t" !important;
      speak: none;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      text-align: center;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }`,
    getStylesheet(),
  ];

  classPrefix = getClassPrefix();

  static defaultProps = {
    name: '',
    tag: 'i',
    loadDefaultIcons: true,
  }

  static propTypes = {
    name: String,
    url: [String, Array],
    loadDefaultIcons: Boolean,
    className: String,
    size: String,
    style: Object,
  }

  get isBuiltInIcon() {
    return this.props.url && /^t-icon-(\w|-)+$/.test(this.props.name || '');
  }

  get cls() {
    const { className: sizeClassName } = getSizeProps(this.props.size);
    return classNames({
      [this.props.name || '']: this.props.url,
      [`${this.classPrefix}-icon`]: !this.props.url || this.isBuiltInIcon,
      [`${this.classPrefix}-icon-${this.props.name}`]: !this.props.url,
    }, sizeClassName, this.props.className);
  }

  render(props: OmiProps<IconFontProps, any>) {
    const {
      size,
      tag: Tag = 'i',
      style: customStyle,
      ...htmlProps
    } = props;

    delete htmlProps.loadDefaultIcons;
    delete htmlProps.url;
    delete htmlProps.className;
    delete htmlProps.name;

    const { style: sizeStyle } = getSizeProps(size);
    const fontCode = (fontJson?.find((item) => item.name === this.props.name) || {}).codepoint;

    return <>
      <style>{`.t-icon-${this.props.name}:before {content: "${fontCode}";}`}</style>
      <Tag
        class={this.cls}
        style={{ ...customStyle, ...sizeStyle }}
        part='t-icon'
        {...htmlProps}
      ></Tag>
    </>;
  }
}
