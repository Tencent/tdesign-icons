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
  selector: 't-icon-qrcode',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M6 4H4v2h2V4z" fill-opacity="0.9"></path><path fill="currentColor" d="M2.5 2a.5.5 0 00-.5.5v5c0 .28.22.5.5.5h5a.5.5 0 00.5-.5v-5a.5.5 0 00-.5-.5h-5zM3 3h4v4H3V3zM10.5 2a.5.5 0 00-.5.5v3c0 .28.22.5.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3zm.5 3V3h2v2h-2zM10 10.5c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3zm1 2.5h2v-2h-2v2zM2.5 10a.5.5 0 00-.5.5v3c0 .28.22.5.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3zm.5 1h2v2H3v-2zM14 7.5h-4v1h4v-1zM8.5 11v3h-1v-3h1zM8.5 10V9h-1v1h1z" fill-opacity="0.9"></path></svg>',
})
export class TIconQrcodeComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'qrcode';
}
