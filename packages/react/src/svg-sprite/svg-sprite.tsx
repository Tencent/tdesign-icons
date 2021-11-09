// eslint-disable-next-line no-use-before-define
import * as React from 'react';
import {
  forwardRef, Ref, useEffect, useMemo, CSSProperties,
} from 'react';
import classNames from 'classnames';
import useConfig from '../util/use-config';
import useSizeProps from '../iconfont/use-size-props';
import { checkScriptAndLoad } from '../util/check-url-and-load';

import { IconProps as BaseIconProps } from './type';

import '../style/index.css';

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

const CDN_SVGSPRITE_URL = 'https://tdesign.gtimg.com/icon/0.0.3/fonts/index.js';

/**
 * 图标组件
 * svg 版本
 */
export const Icon = forwardRef((props: SpriteIconProps, ref: Ref<SVGSVGElement>) => {
  const { classPrefix } = useConfig();
  const {
    name,
    size,
    url = [],
    loadDefaultIcons = true,
    className: customClassName,
    style: customStyle,
    ...restProps
  } = props;
  const { className: sizeClassName, style: sizeStyle } = useSizeProps(size || 'middle');
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

    checkScriptAndLoad(CDN_SVGSPRITE_URL, `${classPrefix}-svg-js-stylesheet--unique-class`);
  }, [classPrefix, loadDefaultIcons]);

  // 加载 url
  useEffect(() => {
    const urls = Array.isArray(url) ? url : [url];
    urls.forEach((url) => {
      checkScriptAndLoad(url, `${classPrefix}-svg-js-stylesheet--unique-class`);
    });
  }, [classPrefix, url]);

  return (
    <svg ref={ref} className={className} style={{ ...customStyle, ...sizeStyle }} {...restProps}>
      <use xlinkHref={`#t-icon-${name}`} />
    </svg>
  );
});

Icon.displayName = 'Icon';
