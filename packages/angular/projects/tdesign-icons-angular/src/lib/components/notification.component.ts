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
  selector: 't-icon-notification',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M8.5 2.03V1h-1v1.03a4.5 4.5 0 00-4 4.47V11l-.9 1.2a.5.5 0 00.4.8h2.55a2.5 2.5 0 004.9 0H13a.5.5 0 00.4-.8l-.9-1.2V6.5a4.5 4.5 0 00-4-4.47zm-4 9.3V6.5a3.5 3.5 0 117 0v4.83l.5.67H4l.5-.67zM8 14a1.5 1.5 0 01-1.41-1H9.4c-.2.58-.76 1-1.41 1z" fill-opacity="0.9"></path></svg>',
})
export class TIconNotificationComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'notification';
}
