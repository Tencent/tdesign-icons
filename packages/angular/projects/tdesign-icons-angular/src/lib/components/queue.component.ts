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
  selector: 't-icon-queue',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M4 3h9v9h1V3a1 1 0 00-1-1H4v1z" fill-opacity="0.9"></path><path fill="currentColor" d="M6.58 9.42v2.91h1V9.42h2.75v-1H7.58V5.67h-1v2.75H3.67v1h2.91z" fill-opacity="0.9"></path><path fill="currentColor" d="M2 13a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-1-1H3a1 1 0 00-1 1v8zm1-8h8v8H3V5z" fill-opacity="0.9"></path></svg>',
})
export class TIconQueueComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'queue';
}
