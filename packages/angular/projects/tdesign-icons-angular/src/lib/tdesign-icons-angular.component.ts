import {
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
  OnChanges,
  Component,
  Directive,
  OnInit,
} from '@angular/core';
import { TIconService } from './tdesign-icons-angular.service';

const DEFAULT_ICON_SVG_URL = 'https://tdesign.gtimg.com/icon/0.0.3/fonts/index.js';
const DEFAULT_ICONFONT_URL = 'https://tdesign.gtimg.com/icon/0.0.3/fonts/index.css';

const prefix = 't';

const sizeMap = {
  default: '',
  xs: `${prefix}-size-xs`,
  small: `${prefix}-size-s`,
  medium: `${prefix}-size-m`,
  large: `${prefix}-size-l`,
  xl: `${prefix}-size-xl`,
  block: `${prefix}-size-full-width`,
} as const;

export type TIconSize = keyof typeof sizeMap;
function isSize(key: string | TIconSize): key is TIconSize {
  return Object.keys(sizeMap).findIndex((s) => s === key) > -1;
}

export interface NgStyleInterface {
  [key: string]: unknown;
}

export interface NgClassInterface {
  [key: string]: boolean;
}

export abstract class TIconCommonBase {
  public _classes: NgClassInterface = {};
  public _styles: NgStyleInterface = {};
}

@Directive()
/**
 * all standalone icons should inherit this component
 */
export abstract class TIconStandaloneComponent
  extends TIconCommonBase
  implements OnInit, OnChanges {
  protected abstract styles?: NgStyleInterface;
  protected abstract classes?: NgClassInterface;
  protected abstract size: string | TIconSize = 'default';
  protected abstract name: string;

  public ngOnInit(): void {
    this.updateStyle();
  }

  public ngOnChanges(): void {
    this.updateStyle();
  }

  protected updateStyle(): void {
    const classes = {
      ['t-icon']: true,
      [`t-icon-${this.name}`]: true,
      [sizeMap[this.size as TIconSize]]: isSize(this.size),
    };

    this._classes = { ...classes, ...this.classes };

    const styles = {
      ['font-size']: !isSize(this.size) ? this.size : null,
    };

    this._styles = { ...styles, ...this.styles };
  }
}

@Component({
  selector: 't-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf="isSvgIcon">
      <svg [ngClass]="_classes" [ngStyle]="_styles">
        <use [attr.xlink:href]="'#' + $any(svg)" />
      </svg>
    </ng-container>
    <ng-container *ngIf="!isSvgIcon">
      <i [ngClass]="_classes" [ngStyle]="_styles"></i>
    </ng-container>
  `,
})
export class TIconComponent extends TIconCommonBase implements OnChanges {
  @Input() public svg?: string;
  @Input() public iconfont?: string;

  @Input() public size: string | TIconSize = 'default';

  @Input() public styles?: NgStyleInterface;
  @Input() public classes?: NgClassInterface;

  public isSvgIcon = false;

  constructor(private iconSrv: TIconService) {
    super();
  }

  public ngOnChanges(): void {
    this.checkIconType();
    this.updateStyle();
  }

  protected updateStyle(): void {
    const classes = {
      ['t-icon']: true,
      [`${this.isSvgIcon ? this.svg : this.iconfont}`]: true,
      [sizeMap[this.size as TIconSize]]: isSize(this.size),
    };

    this._classes = { ...classes, ...this.classes };

    const styles = {
      ['font-size']: !isSize(this.size) ? this.size : null,
    };

    this._styles = { ...styles, ...this.styles };
  }

  private checkIconType(): void {
    if (!!this.svg && !!this.iconfont) {
      throw new Error(
        '[t-design:icon]: [svg] and [iconfont] could not be both assigned or not assigned'
      );
    }

    this.isSvgIcon = !!this.svg;
    this.tryLoadingIconResources(this.isSvgIcon);
  }

  private tryLoadingIconResources(isSvg = false): void {
    if (isSvg && this.svg?.startsWith('t-icon')) {
      this.iconSrv.loadSvgIcon(DEFAULT_ICON_SVG_URL);
    } else if (this.iconfont?.startsWith('t-icon')) {
      this.iconSrv.loadIconfont(DEFAULT_ICONFONT_URL);
    }
  }
}
