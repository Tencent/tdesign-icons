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
  selector: 't-icon-secured',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M7.39 9.93l3.57-3.58-.7-.7L7.39 8.5 5.74 6.87l-.7.7 2.35 2.36z" fill-opacity="0.9"></path><path fill="currentColor" d="M2.5 2v7c0 1.42.74 2.73 1.96 3.46L8 14.58l3.54-2.12A4.03 4.03 0 0013.5 9V2h-11zm1 7V3h9v6c0 1.07-.56 2.05-1.47 2.6L8 13.42 4.97 11.6A3.03 3.03 0 013.5 9z" fill-opacity="0.9"></path></svg>',
})
export class TIconSecuredComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'secured';
}
