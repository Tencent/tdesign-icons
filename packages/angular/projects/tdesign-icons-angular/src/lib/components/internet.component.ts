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
  selector: 't-icon-internet',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M1.1 7.9a6.9 6.9 0 1113.8 0v.2a6.9 6.9 0 11-13.8 0v-.2zm12.79.6h-3a9.86 9.86 0 01-1.96 5.43A5.9 5.9 0 0013.9 8.5zm-3-1h3a5.9 5.9 0 00-4.96-5.43A9.86 9.86 0 0110.9 7.5zm-1 0A8.87 8.87 0 008 2.5a8.87 8.87 0 00-1.89 5H9.9zm-4.78 1h-3a5.9 5.9 0 004.96 5.43A9.86 9.86 0 015.1 8.5zm0-1c.1-1.92.75-3.82 1.96-5.43A5.9 5.9 0 002.1 7.5h3zm4.78 1H6.1c.1 1.78.73 3.53 1.89 5a8.87 8.87 0 001.89-5z" fill-opacity="0.9"></path></svg>',
})
export class TIconInternetComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'internet';
}
