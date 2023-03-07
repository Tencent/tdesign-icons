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
  selector: 't-icon-filter-clear',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M2 2h9a1 1 0 01.69 1.73L8 7.2v5.54L5 15V7.21L1.32 3.73A1 1 0 011.2 2.4l.08-.1A1 1 0 012 2zm9 1H2l4 3.78V13l1-.75V6.78L11 3zM10.7 10l1.42 1.41L13.54 10l.7.7-1.41 1.42 1.41 1.42-.7.7-1.42-1.41-1.41 1.41-.71-.7 1.41-1.42L10 10.71l.7-.71z" fill-opacity="0.9"></path></svg>',
})
export class TIconFilterClearComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'filter-clear';
}
