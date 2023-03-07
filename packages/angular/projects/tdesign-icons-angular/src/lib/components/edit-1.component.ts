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
  selector: 't-icon-edit-1',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><g fill="currentColor" opacity="0.9" fill-opacity="0.9"><path d="M14.13 4.95L10.9 1.71l.7-.71 3.25 3.24-.7.71zM5.97 13.11l-3.61.72a.3.3 0 01-.35-.35l.72-3.61 7.3-7.3 3.24 3.24-7.3 7.3zm5.89-7.3l-1.83-1.83-6.38 6.38-.46 2.29 2.29-.46 6.38-6.38zM15 11h-4v1h4v-1zM15 13H8.5v1H15v-1z"></path></g></svg>',
})
export class TIconEdit1Component extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'edit-1';
}
