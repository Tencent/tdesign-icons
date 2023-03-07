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
  selector: 't-icon-menu-unfold',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M14 12.01L2 12v1l12 .01v-1zM8.5 7.5H2v1h6.5v-1zM14 3.01L2 3v1l12 .01v-1zM10.03 8.4a.5.5 0 010-.8l3.17-2.37a.5.5 0 01.8.4v4.75a.5.5 0 01-.8.4l-3.17-2.37zm2.97.98V6.63l-1.83 1.38L13 9.38z" fill-opacity="0.9"></path></svg>',
})
export class TIconMenuUnfoldComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'menu-unfold';
}
