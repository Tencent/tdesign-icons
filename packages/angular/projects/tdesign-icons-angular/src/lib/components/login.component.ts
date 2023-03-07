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
  selector: 't-icon-login',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M8.48 7.5L6.23 5.25l.7-.7 3.1 3.1c.2.2.2.5 0 .7l-3.1 3.1-.7-.7L8.48 8.5H1v-1h7.48z" fill-opacity="0.9"></path><path fill="currentColor" d="M4 5V3h8v10H4v-2H3v2.5c0 .28.22.5.5.5h9a.5.5 0 00.5-.5v-11a.5.5 0 00-.5-.5h-9a.5.5 0 00-.5.5V5h1z" fill-opacity="0.9"></path></svg>',
})
export class TIconLoginComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'login';
}
