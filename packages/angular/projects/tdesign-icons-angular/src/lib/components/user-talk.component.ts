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
  selector: 't-icon-user-talk',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M13.33 7.83a4 4 0 000-5.66l.7-.7a5 5 0 010 7.07l-.7-.71zM11 5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zm-1 0a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0zM13.46 10.85c.34.16.54.5.54.87V14a.5.5 0 01-.5.5h-12A.5.5 0 011 14v-2.28c0-.37.2-.7.54-.87a13.79 13.79 0 0111.92 0zM7.5 10.5c-1.97 0-3.83.45-5.5 1.24v1.76h11v-1.76a12.78 12.78 0 00-5.5-1.24z" fill-opacity="0.9"></path><path fill="currentColor" d="M11.91 3.59a2 2 0 010 2.82l.71.71a3 3 0 000-4.24l-.7.7z" fill-opacity="0.9"></path></svg>',
})
export class TIconUserTalkComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'user-talk';
}
