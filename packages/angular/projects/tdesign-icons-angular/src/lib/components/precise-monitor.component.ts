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
  selector: 't-icon-precise-monitor',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M7.5 1.5V5h1V1.5h-1zM6.23 5.53L2.7 1.99l-.71.7 3.54 3.54.7-.7zm3.54 0l3.53-3.54.71.7-3.54 3.54-.7-.7zM9 8a1 1 0 01-1.87.5H1.5v-1h5.63A1 1 0 019 8zM5.53 9.77L1.99 13.3l.7.71 3.54-3.54-.7-.7zm4.94 0l3.54 3.53-.7.71-3.54-3.54.7-.7zM14.5 7.5H11v1h3.5v-1zm-7 7V11h1v3.5h-1z" opacity="0.9"></path></svg>',
})
export class TIconPreciseMonitorComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'precise-monitor';
}
