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
  selector: 't-icon-mirror',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M7.5 1h1v14h-1V1zM14.72 12.44a.5.5 0 01-.35.54c-.07.02-.17.02-.38.02h-3.34l-.27-.01a.5.5 0 01-.37-.37l-.01-.27V5c0-.53 0-.8.04-.89a.5.5 0 01.8-.17c.07.07.18.3.4.8l3.34 7.34c.09.19.13.28.14.36zM11 12h2.45L11 6.62V12zM1.63 12.98c.07.02.17.02.38.02h3.34l.27-.01a.5.5 0 00.37-.37l.01-.27V5c0-.53 0-.8-.04-.89a.5.5 0 00-.8-.17c-.07.07-.18.3-.4.8l-3.34 7.34c-.09.19-.13.28-.14.36a.5.5 0 00.35.54zM5 6.62V12H2.55L5 6.62z" fill-opacity="0.9"></path></svg>',
})
export class TIconMirrorComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'mirror';
}
