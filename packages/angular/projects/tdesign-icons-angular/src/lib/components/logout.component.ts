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
  selector: 't-icon-logout',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M9 3v2h1V2.5a.5.5 0 00-.5-.5h-8a.5.5 0 00-.5.5v11c0 .28.22.5.5.5h8a.5.5 0 00.5-.5V11H9v2H2V3h7z" fill-opacity="0.9"></path><path fill="currentColor" d="M11.23 5.25l2.25 2.25H6v1h7.48l-2.25 2.25.7.7 3.1-3.1a.5.5 0 000-.7l-3.1-3.1-.7.7z" fill-opacity="0.9"></path></svg>',
})
export class TIconLogoutComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'logout';
}
