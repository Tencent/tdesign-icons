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
  selector: 't-icon-share',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M9.93 5.36a2.31 2.31 0 004.02-1.57 2.32 2.32 0 10-4.52.7L6.07 6.45a2.31 2.31 0 00-4.02 1.58A2.32 2.32 0 006.07 9.6l3.36 1.96a2.32 2.32 0 10.5-.87L6.57 8.73a2.32 2.32 0 000-1.41l3.36-1.96zm1.7-2.9a1.32 1.32 0 110 2.64 1.32 1.32 0 010-2.63zM5.5 7.35a.5.5 0 00.03.05 1.31 1.31 0 01-.03 1.33 1.32 1.32 0 110-1.38zm4.83 4.93c0-.22.05-.43.14-.6a.52.52 0 00.07-.13 1.32 1.32 0 11-.21.73z" fill-opacity="0.9"></path></svg>',
})
export class TIconShareComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'share';
}
