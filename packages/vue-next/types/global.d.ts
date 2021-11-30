declare const __VERSION__: string;

declare interface Styles {
  [css: string]: string | number;
}

declare type SizeEnum = 'small' | 'medium' | 'large';

declare type ClassName = { [className: string]: any } | ClassName[] | string;
