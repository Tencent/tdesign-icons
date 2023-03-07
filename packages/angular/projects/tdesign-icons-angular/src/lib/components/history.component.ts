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
  selector: 't-icon-history',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M7.9 2.8c2.95 0 5.31 2.34 5.31 5.2 0 2.86-2.36 5.21-5.3 5.21a5.29 5.29 0 01-5.13-3.85l-1.03.17a6.33 6.33 0 006.16 4.72A6.3 6.3 0 0014.25 8a6.3 6.3 0 00-6.34-6.25c-2.1 0-3.97 1-5.12 2.55V2.64H1.75V5.8c0 .28.22.5.5.5h3.13V5.25H3.4a5.32 5.32 0 014.5-2.46z" fill-opacity="0.9"></path><path fill="currentColor" d="M7 5.5v2.89l2.65 2.65.7-.71L8 7.97V5.5H7z" fill-opacity="0.9"></path></svg>',
})
export class TIconHistoryComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'history';
}
