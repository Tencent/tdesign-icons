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
  selector: 't-icon-cart',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M1 3h1.58l1.39 8.33c.06.39.4.67.78.67H14v-1H4.92L4.6 9h8.63a.8.8 0 00.78-.6l.85-3.4a.8.8 0 00-.78-1H3.76l-.23-1.33A.8.8 0 002.75 2H1v1zm12.07 5H4.42l-.5-3h9.9l-.75 3zM4.75 14.5a.75.75 0 100-1.5.75.75 0 000 1.5zM12.81 14.5a.75.75 0 100-1.5.75.75 0 000 1.5z" fill-opacity="0.9"></path></svg>',
})
export class TIconCartComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'cart';
}
