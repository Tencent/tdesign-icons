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
  selector: 't-icon-usb',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M7.5 6h-2V5h2v1zM8.5 6h2V5h-2v1z" fill-opacity="0.9"></path><path fill="currentColor" d="M4 8V2.5c0-.28.22-.5.5-.5h7c.28 0 .5.22.5.5V8a1 1 0 011 1v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1zm1 0h6V3H5v5zM4 9v5h8V9H4z" fill-opacity="0.9"></path></svg>',
})
export class TIconUsbComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'usb';
}
