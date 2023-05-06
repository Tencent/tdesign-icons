declare const __VERSION__: string;

declare interface Styles {
  [css: string]: string | number;
}

declare type SizeEnum = 'small' | 'medium' | 'large';

declare type ClassName = { [className: string]: any } | ClassName[] | string;

declare module 'classnames' {
  import * as classNames from 'classnames';

  export = classNames;
}
