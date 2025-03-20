import {
  forwardRef, Ref, HTMLAttributes, useEffect, createElement, CSSProperties, useMemo,
} from 'react';
import classNames from 'classnames';
import useConfig from '../util/use-config';
import useSizeProps from '../util/use-size-props';
import { loadLink, loadStylesheet } from '../util/check-url-and-load';

export interface IconFontProps extends HTMLAttributes<HTMLElement> {
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
   * 样式
   */
  style?: CSSProperties;

  /**
   * 类名
   */
  className?: string;

  /**
   * 图标地址
   */
  url?: string | string[];

  /**
   * @default true
   */
  loadDefaultIcons?: boolean;
}

const CDN_ICONFONT_URL = 'https://tdesign.gtimg.com/icon/0.3.1/fonts/index.css';

/**
 * 图标组件
 * iconfont 版本
 */
export const IconFont = forwardRef((props: IconFontProps, ref: Ref<HTMLElement>) => {
  const { classPrefix } = useConfig();
  const {
    name = '',
    size,
    tag = 'i',
    className: customClassName,
    url,
    loadDefaultIcons = true,
    style: customStyle,
    ...htmlProps
  } = props;
  const { className: sizeClassName, style: sizeStyle } = useSizeProps(size);

  const isBuiltInIcon = props.url && /^t-icon-(\w|-)+$/.test(name);

  const className = useMemo(
    () => classNames({
      [name]: props.url,
      [`${classPrefix}-icon`]: !props.url || isBuiltInIcon,
      [`${classPrefix}-icon-${name}`]: !props.url,
    }, sizeClassName, customClassName),
    [classPrefix, customClassName, name, sizeClassName],
  );

  useEffect(() => {
    loadStylesheet();
  }, []);

  useEffect(() => {
    // 不加载图标
    if (!loadDefaultIcons) {
      return;
    }

    loadLink(CDN_ICONFONT_URL, `${classPrefix}-iconfont-stylesheet--unique-class`);
  }, [classPrefix, loadDefaultIcons]);

  // 加载 url
  useEffect(() => {
    const urls = Array.isArray(url) ? url : [url];
    (urls as Array<string>).forEach((url) => {
      loadLink(url, `${classPrefix}-iconfont-stylesheet--unique-class`);
    });
  }, [classPrefix, url]);

  return createElement(tag, {
    ref,
    style: { ...customStyle, ...sizeStyle },
    className,
    ...htmlProps,
  });
});

IconFont.displayName = 'Icon';
