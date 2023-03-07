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
  selector: 't-icon-refresh',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M8 2.71c2.9 0 5.25 2.36 5.25 5.29h.96a6.2 6.2 0 00-11.5-3.28V2.64h-.96v3.1c0 .29.22.5.5.5h3.09v-.96H3.49A5.25 5.25 0 018 2.71zM1.79 8h.96a5.25 5.25 0 009.76 2.71h-1.85v-.96h3.09c.28 0 .5.22.5.5v3.1h-.96v-2.07A6.2 6.2 0 011.8 8z" fill-opacity="0.9"></path></svg>',
})
export class TIconRefreshComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'refresh';
}
