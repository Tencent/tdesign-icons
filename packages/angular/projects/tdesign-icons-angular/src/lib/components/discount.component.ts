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
  selector: 't-icon-discount',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M7.84 5.01A2 2 0 105 7.84 2 2 0 007.84 5zm-.7.7a1 1 0 11-1.42 1.42 1 1 0 011.41-1.41z" fill-opacity="0.9"></path><path fill="currentColor" d="M2 7.95V2h5.95a1 1 0 01.7.3l6.14 6.13a1 1 0 010 1.41L9.84 14.8a1 1 0 01-1.41 0L2.29 8.66A1 1 0 012 7.95zM7.95 3H3v4.95l6.13 6.13 4.95-4.95L7.95 3z" fill-opacity="0.9"></path></svg>',
})
export class TIconDiscountComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'discount';
}
