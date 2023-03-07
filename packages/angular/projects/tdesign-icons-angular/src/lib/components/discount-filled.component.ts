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
  selector: 't-icon-discount-filled',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M6.99 5.33a1.17 1.17 0 11-1.66 1.66 1.17 1.17 0 011.66-1.66z" fill-opacity="0.9"></path><path fill="currentColor" d="M2 7.73c0 .27.1.52.3.7l5.9 5.92a1 1 0 001.42 0l4.73-4.73a1 1 0 000-1.41L8.44 2.29A1 1 0 007.73 2H2v5.73zm5.7-3.1a2.17 2.17 0 11-3.08 3.06A2.17 2.17 0 017.7 4.62z" fill-opacity="0.9"></path></svg>',
})
export class TIconDiscountFilledComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'discount-filled';
}
