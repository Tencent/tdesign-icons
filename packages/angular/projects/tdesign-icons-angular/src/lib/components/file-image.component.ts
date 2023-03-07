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
  selector: 't-icon-file-image',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M3.57 1c-.47 0-1 .34-1 .92v12.16c0 .58.53.92 1 .92h8.93c.48 0 1-.34 1-.92V5.7a1 1 0 00-.29-.7L9.58 1.3a1 1 0 00-.71-.3h-5.3zm0 10.36V2h5v4h3.93v4.29l-1.92-1.93-3 3-2-2-2 2zm0 1.28l2-2L6.95 12l-2 2H3.58v-1.36zm7-3l1.93 1.92V14H6.21l4.37-4.36zM11.83 5H9.58V2.72l2.24 2.29z" fill-opacity="0.9"></path></svg>',
})
export class TIconFileImageComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'file-image';
}
