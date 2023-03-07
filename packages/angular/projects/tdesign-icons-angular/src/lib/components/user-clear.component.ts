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
  selector: 't-icon-user-clear',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M8 8.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm0-1a2.5 2.5 0 110-5 2.5 2.5 0 010 5zM10.5 10.75a12.8 12.8 0 00-8 .99v1.76h8v1H2a.5.5 0 01-.5-.5v-2.28c0-.37.2-.7.54-.87a13.79 13.79 0 018.46-1.12v1.02zM11.4 14.3l1.6-1.6-1.6-1.59.71-.7 1.6 1.58 1.58-1.59.71.71-1.6 1.6 1.6 1.58-.7.71-1.6-1.6-1.59 1.6-.7-.7z"></path></svg>',
})
export class TIconUserClearComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'user-clear';
}
