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
  selector: 't-icon-lock-off',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M6 11v-1h4v1H6z" fill-opacity="0.9"></path><path fill="currentColor" d="M4.5 6V5a3.5 3.5 0 117 0h-1a2.5 2.5 0 00-5 0v1H13c.28 0 .5.22.5.5v7a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5v-7c0-.28.22-.5.5-.5h1.5zm-1 7h9V7h-9v6z" fill-opacity="0.9"></path></svg>',
})
export class TIconLockOffComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'lock-off';
}
