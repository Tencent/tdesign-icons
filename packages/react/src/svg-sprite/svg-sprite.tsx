// eslint-disable-next-line no-use-before-define
import * as React from 'react';
import {
  forwardRef, Ref, useEffect, useMemo, CSSProperties,
} from 'react';
import classNames from 'classnames';
import useConfig from '../util/use-config';
import useSizeProps from '../util/use-size-props';
import { loadScript, loadStylesheet } from '../util/check-url-and-load';

import { IconProps as BaseIconProps } from './type';

export interface SpriteIconProps extends BaseIconProps {
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

  /**
   * 样式
   */
  style?: CSSProperties;

  /**
   * 类名
   */
  className?: string;
}

const CDN_SVGSPRITE_URL = 'https://tdesign.gtimg.com/tea-icon/0.1.1/fonts/index.js';

/**
 * 图标组件
 * svg 版本
 */
export const Icon = forwardRef((props: SpriteIconProps, ref: Ref<SVGSVGElement>) => {
  const { classPrefix, iconfontClassPrefix } = useConfig();
  const {
    name,
    size,
    url,
    loadDefaultIcons = true,
    className: customClassName,
    style: customStyle,
    ...restProps
  } = props;
  const { className: sizeClassName, style: sizeStyle } = useSizeProps(size);

  const className = useMemo(
    () => {
      const iconName = url ? name : `${classPrefix}-icon-${name}`;
      return classNames(`${classPrefix}-icon`, iconName, sizeClassName, customClassName);
    },
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

    loadScript(CDN_SVGSPRITE_URL, `${classPrefix}-svg-js-stylesheet--unique-class`);
  }, [classPrefix, loadDefaultIcons]);

  // 加载 url
  useEffect(() => {
    const urls = Array.isArray(url) ? url : [url];
    (urls as Array<string>).forEach((url) => {
      loadScript(url, `${classPrefix}-svg-js-stylesheet--unique-class`);
    });
  }, [iconfontClassPrefix, url]);

  return (
    <svg ref={ref} className={className} style={{ ...customStyle, ...sizeStyle }} {...restProps}>
      <use xlinkHref={url ? `#${name}` : `#${iconfontClassPrefix}-icon-${name}`} />
    </svg>
  );
});

Icon.displayName = 'Icon';
