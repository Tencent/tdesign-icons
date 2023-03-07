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
  selector: 't-icon-menu-fold',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M2 3.99L14 4V3L2 2.99v1zM7.5 8.5H14v-1H7.5v1zM2 12.99L14 13v-1l-12-.01v1zM5.97 7.6c.26.2.26.6 0 .8L2.8 10.76a.5.5 0 01-.8-.4V5.62a.5.5 0 01.8-.4l3.17 2.37zM3 6.61v2.75l1.83-1.38L3 6.62z" fill-opacity="0.9"></path></svg>',
})
export class TIconMenuFoldComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'menu-fold';
}
