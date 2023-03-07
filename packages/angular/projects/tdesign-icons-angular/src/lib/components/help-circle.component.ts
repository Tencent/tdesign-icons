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
  selector: 't-icon-help-circle',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M7.4 11.6a.6.6 0 111.2 0 .6.6 0 01-1.2 0zM8 4a2.43 2.43 0 00-2.43 2.43h1a1.43 1.43 0 012.85 0c0 .54-.45 1.08-1.03 1.31-.53.22-.9.74-.9 1.35V10h1v-.9c0-.2.12-.36.28-.43.83-.34 1.65-1.17 1.65-2.24a2.43 2.43 0 00-2.43-2.42z" fill-opacity="0.9"></path><path fill="currentColor" d="M15 8A7 7 0 101 8a7 7 0 0014 0zm-1 0A6 6 0 112 8a6 6 0 0112 0z" fill-opacity="0.9"></path></svg>',
})
export class TIconHelpCircleComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'help-circle';
}
