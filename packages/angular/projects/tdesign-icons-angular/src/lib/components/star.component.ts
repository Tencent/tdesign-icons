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
  selector: 't-icon-star',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M9.54 6.38L8 3.26 6.46 6.38l-3.44.5L5.5 9.31l-.59 3.43L8 11.12l3.08 1.62-.59-3.43L13 6.88l-3.45-.5zm5-.29a.3.3 0 01.16.52l-3.13 3.05.74 4.3a.3.3 0 01-.44.32L8 12.25l-3.87 2.03a.3.3 0 01-.43-.31l.73-4.31L1.3 6.6a.3.3 0 01.17-.52l4.33-.62 1.93-3.92a.3.3 0 01.54 0l1.94 3.92 4.32.62z" fill-opacity="0.9"></path></svg>',
})
export class TIconStarComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'star';
}
