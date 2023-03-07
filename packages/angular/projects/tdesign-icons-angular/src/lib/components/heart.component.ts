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
  selector: 't-icon-heart',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M8 5.86l1.06-.98a2.35 2.35 0 013.25 3.4L8 12.57l-4.31-4.3a2.35 2.35 0 013.25-3.4L8 5.86zm-.39-1.72a3.35 3.35 0 00-4.63 4.84l4.87 4.87a.2.2 0 00.3 0l4.87-4.87a3.35 3.35 0 00-4.63-4.84L8 4.5l-.39-.36z" fill-opacity="0.9"></path></svg>',
})
export class TIconHeartComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'heart';
}
