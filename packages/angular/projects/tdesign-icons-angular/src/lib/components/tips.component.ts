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
  selector: 't-icon-tips',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M8 1c-1.38 0-2.63.55-3.53 1.47a4.96 4.96 0 000 7.06c.3.32.65.58 1.03.8V12a1 1 0 001 1h3a1 1 0 001-1v-1.67A4.96 4.96 0 0013 6a5 5 0 00-5-5zM5.18 3.17a4 4 0 115.65 5.65v.01c-.3.3-.66.55-1.05.75l-.28.14V12h-3V9.72l-.28-.14A3.96 3.96 0 014 6c0-1.1.44-2.1 1.17-2.82zM5.5 14v1h5v-1h-5z" fill-opacity="0.9"></path></svg>',
})
export class TIconTipsComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'tips';
}
