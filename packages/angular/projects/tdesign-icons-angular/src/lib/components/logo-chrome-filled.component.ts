import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
  HostBinding,
} from '@angular/core';
import {
  NgStyleInterface,
  NgClassInterface,
  TIconStandaloneComponent,
  TIconSize,
  // @ts-ignore
} from '../tdesign-icons-angular.component';

@Component({
  selector: 't-icon-logo-chrome-filled',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M14.02 4.43a.11.11 0 01-.1.18H8.31 8.3L8 4.58a3.4 3.4 0 00-3.3 2.56.11.11 0 01-.21.03L2.52 3.76a.11.11 0 010-.12 6.97 6.97 0 019-1.7c1.03.6 1.9 1.47 2.5 2.5z" fill-opacity="0.9"></path><path fill="currentColor" d="M8 10.62a2.62 2.62 0 110-5.24 2.62 2.62 0 010 5.24z" fill-opacity="0.9"></path><path fill="currentColor" d="M9.03 11.33a.11.11 0 00-.12-.05 3.4 3.4 0 01-4-1.84L2.1 4.57a.11.11 0 00-.2 0 7 7 0 005.07 10.35c.04 0 .08-.02.1-.05l1.97-3.42a.11.11 0 000-.12z" fill-opacity="0.9"></path><path fill="currentColor" d="M10.46 5.37h3.95c.05 0 .1.03.1.07a6.97 6.97 0 01-1.53 7.48A6.96 6.96 0 018.08 15a.11.11 0 01-.1-.17l2.81-4.88h.01a3.38 3.38 0 00-.42-4.38.11.11 0 01.08-.2z" fill-opacity="0.9"></path></svg>',
})
export class TIconLogoChromeFilledComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'logo-chrome-filled';
}
