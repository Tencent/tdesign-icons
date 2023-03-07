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
  selector: 't-icon-file-pdf',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M3.5 14V2h5v4.01h4V7.5h1V5.7a1 1 0 00-.29-.7L9.58 1.3a1 1 0 00-.71-.3H3.5c-.48 0-1 .34-1 .92v12.16c0 .58.52.92 1 .92H12v-1H3.5zm8.32-8.99H9.5V2.65L11.82 5z" fill-opacity="0.9"></path><path fill="currentColor" d="M8.38 9h1.86c.48 0 .87.4.87.88v2.23c0 .48-.39.87-.87.87H8.38V9zm.75.75v2.48h1.1c.08 0 .13-.05.13-.12V9.88a.13.13 0 00-.12-.13H9.13zM5 9h1.86c.48 0 .88.4.88.88v1.05c0 .49-.4.88-.88.88H5.75V13H5V9zm.75 2.06h1.11c.07 0 .13-.06.13-.13V9.88a.12.12 0 00-.13-.12H5.75v1.3zM11.75 13h.75v-1.58h1.62v-.75H12.5v-.92h1.62V9h-2.37v4z" fill-opacity="0.9"></path></svg>',
})
export class TIconFilePdfComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'file-pdf';
}
