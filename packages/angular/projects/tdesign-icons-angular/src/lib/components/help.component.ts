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
  selector: 't-icon-help',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M8 2.5c-1.9 0-3.5 1.45-3.5 3.3h1c0-1.24 1.09-2.3 2.5-2.3s2.5 1.06 2.5 2.3c0 .88-.77 1.75-1.76 2.12-.72.28-1.24.95-1.24 1.76V11h1V9.68c0-.36.23-.68.6-.82 1.2-.46 2.4-1.6 2.4-3.06 0-1.85-1.6-3.3-3.5-3.3zM8 12a.75.75 0 100 1.5.75.75 0 000-1.5z" fill-opacity="0.9"></path></svg>',
})
export class TIconHelpComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'help';
}
