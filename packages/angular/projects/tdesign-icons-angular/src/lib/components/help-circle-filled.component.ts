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
  selector: 't-icon-help-circle-filled',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M15 8A7 7 0 101 8a7 7 0 0014 0zM5.8 6.63a2.2 2.2 0 014.39 0c0 .97-.75 1.72-1.49 2.02a.34.34 0 00-.2.32v.8h-1v-.8c0-.56.33-1.04.82-1.24.5-.2.87-.66.87-1.1a1.2 1.2 0 00-2.39 0h-1zm1.67 4.54a.53.53 0 111.05 0 .53.53 0 01-1.05 0z" fill-opacity="0.9"></path></svg>',
})
export class TIconHelpCircleFilledComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'help-circle-filled';
}
