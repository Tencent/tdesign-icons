import {
  forwardRef, Ref, HTMLAttributes, useEffect, createElement, CSSProperties, useMemo,
} from 'react';
import classNames from 'classnames';
import useConfig from '../util/use-config';
import useSizeProps from './use-size-props';
import { checkLinkAndLoad } from '../util/check-url-and-load';
import '../style/index.css';

export interface IconFontProps extends HTMLAttributes<HTMLElement> {
  /**
   * 图标类型
   */
  name?: string;

  /**
   * 尺寸
   * @default 'middle'
   */
  size?: 'small' | 'middle' | 'large' | string | number;

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

const CDN_ICONFONT_URL = 'https://tdesign.gtimg.com/icon/0.0.3/fonts/index.css';

/**
 * 图标组件
 * iconfont 版本
 */
export const IconFont = forwardRef((props: IconFontProps, ref: Ref<HTMLElement>) => {
  const { classPrefix } = useConfig();
  const {
    name,
    size = 'middle',
    tag = 'i',
    className: customClassName,
    url = [],
    loadDefaultIcons = true,
    style: customStyle,
    ...htmlProps
  } = props;
  const { className: sizeClassName, style: sizeStyle } = useSizeProps(size);
  const className = useMemo(
    () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      classNames(`${classPrefix}-icon`, `${classPrefix}-icon-${name}`, sizeClassName, customClassName),
    [classPrefix, customClassName, name, sizeClassName],
  );

  // 插入 iconfont 样式
  useEffect(() => {
    // 兼容一下服务端渲染
    if (typeof document === 'undefined') {
      return;
    }

    // 不加载图标
    if (!loadDefaultIcons) {
      return;
    }

    checkLinkAndLoad(CDN_ICONFONT_URL, `${classPrefix}-iconfont-stylesheet--unique-class`);
  }, [classPrefix, loadDefaultIcons]);

  // 加载 url
  useEffect(() => {
    const urls = Array.isArray(url) ? url : [url];
    urls.forEach((url) => {
      checkLinkAndLoad(url, `${classPrefix}-iconfont-stylesheet--unique-class`);
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
