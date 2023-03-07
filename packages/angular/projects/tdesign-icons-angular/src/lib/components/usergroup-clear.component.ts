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
  selector: 't-icon-usergroup-clear',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M7.46 1.35a3.25 3.25 0 10-1.5 6.15v-1a2.25 2.25 0 11.87-4.34l.63-.81zM5.95 8.22c-1.93 0-3.76.44-5.4 1.22a.96.96 0 00-.55.87v2.19c0 .28.22.5.5.5h2.36v-1H1v-1.67c1.51-.7 3.18-1.1 4.95-1.1v-1z"></path><path fill="currentColor" d="M13.25 5.06a3.25 3.25 0 11-6.5 0 3.25 3.25 0 016.5 0zm-1 0a2.25 2.25 0 10-4.5 0 2.25 2.25 0 004.5 0zM11 10.47a11.98 11.98 0 00-6 1.06v1.97h5.5v1h-6A.5.5 0 014 14v-2.48c0-.37.2-.72.54-.87A12.83 12.83 0 0111 9.47v1zM13.14 12.34l-1.45 1.45.7.71 1.45-1.45 1.45 1.45.71-.7-1.45-1.46L16 10.9l-.7-.71-1.46 1.45-1.44-1.45-.71.7 1.45 1.45z"></path></svg>',
})
export class TIconUsergroupClearComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'usergroup-clear';
}
