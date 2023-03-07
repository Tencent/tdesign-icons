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
  selector: 't-icon-lock-on',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M6 10v1h4v-1H6z" fill-opacity="0.9"></path><path fill="currentColor" d="M4.5 5v1H3a.5.5 0 00-.5.5v7c0 .28.22.5.5.5h10a.5.5 0 00.5-.5v-7A.5.5 0 0013 6h-1.5V5a3.5 3.5 0 00-7 0zm6 1h-5V5a2.5 2.5 0 015 0v1zm-7 1h9v6h-9V7z" fill-opacity="0.9"></path></svg>',
})
export class TIconLockOnComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'lock-on';
}
