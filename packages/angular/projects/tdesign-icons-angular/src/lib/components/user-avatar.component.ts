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
  selector: 't-icon-user-avatar',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M8 10.5c1.24 0 2.42.31 3.5.88v1.12h1v-1.14a.94.94 0 00-.49-.84 8.48 8.48 0 00-8.02 0 .94.94 0 00-.49.84v1.14h1v-1.12A7.47 7.47 0 018 10.5zM10.5 6a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm-1 0a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"></path><path fill="currentColor" d="M2.5 1.5a1 1 0 00-1 1v11a1 1 0 001 1h11a1 1 0 001-1v-11a1 1 0 00-1-1h-11zm11 1v11h-11v-11h11z"></path></svg>',
})
export class TIconUserAvatarComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'user-avatar';
}
