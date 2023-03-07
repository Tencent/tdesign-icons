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
  selector: 't-icon-file-icon',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M3.5 2v12h7.73v1H3.5c-.48 0-1-.34-1-.92V1.92c0-.58.52-.92 1-.92h5.37a1 1 0 01.71.3L13.21 5a1 1 0 01.29.7v1.8h-1V6.01h-4V2h-5zm6 3.01h2.32L9.5 2.65V5z" fill-opacity="0.9"></path><path fill="currentColor" d="M4.48 9h2v.8h-.6v2.4h.6v.8h-2v-.8h.6V9.8h-.6V9zM9 9H7.8a.8.8 0 00-.8.8v2.4c0 .44.35.8.8.8H9v-.8H7.8V9.8H9V9zM13.8 9.8V13H13V9h1.74c.44 0 .8.36.8.8V13h-.8V9.8h-.94zM9.5 9.8v2.4c0 .44.36.8.8.8h1.2a.8.8 0 00.79-.8V9.8a.8.8 0 00-.8-.79h-1.2a.8.8 0 00-.79.8zm.8 2.4V9.8h1.2v2.4h-1.2z" fill-opacity="0.9"></path></svg>',
})
export class TIconFileIconComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'file-icon';
}
