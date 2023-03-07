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
  selector: 't-icon-app',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M11.25 1.75a3 3 0 100 6 3 3 0 000-6zm-2 3a2 2 0 114 0 2 2 0 01-4 0zM2 3a1 1 0 011-1h3.5a1 1 0 011 1v3.5a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm1 0v3.5h3.5V3H3zM2 9.5a1 1 0 011-1h3.5a1 1 0 011 1V13a1 1 0 01-1 1H3a1 1 0 01-1-1V9.5zm1 0V13h3.5V9.5H3zM8.5 9.5a1 1 0 011-1H13a1 1 0 011 1V13a1 1 0 01-1 1H9.5a1 1 0 01-1-1V9.5zm1 3.5H13V9.5H9.5V13z" fill-opacity="0.9"></path></svg>',
})
export class TIconAppComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'app';
}
