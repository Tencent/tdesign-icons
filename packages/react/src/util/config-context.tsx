import { createContext } from 'react';

// 支持 webpack 注入
export const DEFAULT_CLASS_PREFIX = 't';
export const DEFAULT_ICON_FONT_CLASS_PREFIX = 'tea'; // 避免混用冲突
export const DEFAULT_LOCALE = 'zh-CN';

export interface Config {
  /**
   * 组件类名前缀
   *
   * @default 't'
   */
  classPrefix?: string;
  /**
   * icon font 及 svg sprite 前缀
   *
   * @default 't'
   */
  iconfontClassPrefix?: string;
  /**
   * 组件语言版本
   *
   * @default 'zh-CN'
   */
  locale?: 'zh-CN';
}

const ConfigContext = createContext<Config>({
  classPrefix: DEFAULT_CLASS_PREFIX,
  iconfontClassPrefix: DEFAULT_ICON_FONT_CLASS_PREFIX,
  locale: DEFAULT_LOCALE,
});

export default ConfigContext;
