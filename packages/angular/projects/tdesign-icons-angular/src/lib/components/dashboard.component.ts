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
  selector: 't-icon-dashboard',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><g fill="currentColor" opacity="0.9" fill-opacity="0.9"><path d="M13.87 4.9l-4.5 4.5-.7-.7 4.5-4.5.7.7z"></path><path d="M8.02 11.05a1 1 0 110-2 1 1 0 010 2zm0 1a2 2 0 100-4 2 2 0 000 4z"></path><path d="M8 3.5a6.5 6.5 0 00-5.34 10.21l-.82.58a7.5 7.5 0 019.63-10.93l-.46.88A6.47 6.47 0 008 3.5zm6.5 6.5c0-1.08-.26-2.1-.73-3l.88-.46a7.47 7.47 0 01-.5 7.75l-.81-.58A6.47 6.47 0 0014.5 10z"></path></g></svg>',
})
export class TIconDashboardComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'dashboard';
}
