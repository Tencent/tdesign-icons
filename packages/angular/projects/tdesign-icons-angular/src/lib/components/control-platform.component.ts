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
  selector: 't-icon-control-platform',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M14.5 4.25L8.47.77a.94.94 0 00-.94 0L1.5 4.25v6.96c0 .33.18.64.47.81L8 15.5l6.03-3.48a.94.94 0 00.47-.81V4.25zM8 7.42L3 4.54l5-2.89 5 2.89-5 2.88zm.5.87l5-2.89v5.77l-5 2.89V8.29zm-1 0v5.77l-5-2.89V5.4l5 2.89z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',
})
export class TIconControlPlatformComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'control-platform';
}
