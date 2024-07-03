import type { OmiProps } from 'omi';
import {
  Component, createElement, tag, css,
} from 'omi';
import classNames, { getClassPrefix } from '../util/classname';
import { loadLink, getStylesheet } from '../util/check-url-and-load';
import getSizeProps from '../util/size-props';
import { IconProps } from '../icon';

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

const CDN_ICONFONT_URL = 'https://tdesign.gtimg.com/icon/0.2.0/fonts/index.css';

/**
 * 图标组件
 * iconfont 版本
 */
@tag('t-icon-font')
export default class IconFont extends Component<IconFontProps> {
  static css = [css`
.t-icon {
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
}
.t-icon-add:before {
  content: "\E005";
}
    `, getStylesheet()];

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

  get className() {
    const { className: sizeClassName } = getSizeProps(this.props.size);
    return classNames({
      [this.props.name || '']: this.props.url,
      [`${this.classPrefix}-icon`]: !this.props.url || this.isBuiltInIcon,
      [`${this.classPrefix}-icon-${this.props.name}`]: !this.props.url,
    }, sizeClassName, this.props.className);
  }

  install() {
    if (this.props.loadDefaultIcons) {
      loadLink(CDN_ICONFONT_URL, `${this.classPrefix}-iconfont-stylesheet--unique-class`, () => {
        this.update();
      });
    }
    const urls = Array.isArray(this.props.url) ? this.props.url : [this.props.url];
    (urls as Array<string>).forEach((url) => {
      loadLink(url, `${this.classPrefix}-iconfont-stylesheet--unique-class`, () => {
        this.update();
      });
    });
  }

  render(props: OmiProps<IconFontProps, any>) {
    const {
      size,
      tag = 'i',
      style: customStyle,
      ...htmlProps
    } = props;

    delete htmlProps.loadDefaultIcons;
    delete htmlProps.url;
    delete htmlProps.className;
    delete htmlProps.name;

    const { style: sizeStyle } = getSizeProps(size);

    return createElement(tag, {
      part: 't-icon',
      style: { ...customStyle, ...sizeStyle },
      className: this.className,
      ...htmlProps,
    });
  }
}
