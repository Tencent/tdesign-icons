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
  selector: 't-icon-order-adjustment-column',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M7.5 8.5V15h1V8.5h4.66l-1.7 1.7.71.7 2.55-2.55a.5.5 0 000-.7L12.17 5.1l-.7.7 1.69 1.7H8.5V1h-1v6.5H2.85l1.69-1.7-.71-.7-2.54 2.55a.5.5 0 000 .7l2.54 2.55.7-.7-1.68-1.7H7.5z" fill-opacity="0.9"></path></svg>',
})
export class TIconOrderAdjustmentColumnComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'order-adjustment-column';
}
