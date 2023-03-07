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
  selector: 't-icon-logo-chrome',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M4.5 1.94a7 7 0 117 12.12 7 7 0 01-7-12.12zm8.95 3.56h-3a3.5 3.5 0 01.63 4.16l-2.49 4.31a6 6 0 004.86-8.47zm-6.02 8.47l1.5-2.6a3.55 3.55 0 01-4.1-1.82l-2.3-4a6 6 0 004.9 8.42zM5 2.8a5.98 5.98 0 00-1.9 1.74l1.49 2.58a3.5 3.5 0 013.05-2.6l.04-.01c.15-.01.3-.02.46-.01h4.73A6 6 0 005 2.8zm2.97 2.7h-.22a2.5 2.5 0 00.45 4.99 2.5 2.5 0 00-.22-5z" fill-opacity="0.9"></path></svg>',
})
export class TIconLogoChromeComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'logo-chrome';
}
