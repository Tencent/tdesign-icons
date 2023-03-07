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
  selector: 't-icon-hourglass',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M8 7.12l4-3.32V2.5H4v1.3l4 3.32zM3 4.27V2.5a1 1 0 011-1h8a1 1 0 011 1v1.77L8.5 8l4.5 3.73v1.77a1 1 0 01-1 1H4a1 1 0 01-1-1v-1.77L7.5 8 3 4.27zm1 7.93v1.3h8v-1.3L8 8.88 4 12.2z" fill-opacity="0.9"></path></svg>',
})
export class TIconHourglassComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'hourglass';
}
