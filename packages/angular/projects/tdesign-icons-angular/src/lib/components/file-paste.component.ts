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
  selector: 't-icon-file-paste',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M11 11.5H5v1h6v-1z" fill-opacity="0.9"></path><path fill="currentColor" d="M2.5 1.92c0-.58.52-.92 1-.92h5.3a1 1 0 01.7.3L13.2 5a1 1 0 01.3.7v8.38c0 .58-.52.92-1 .92h-9c-.48 0-1-.34-1-.92V1.92zm1 .08v12h9V6.01h-4V2h-5zm6 3.01h2.3l-2.3-2.3V5z" fill-opacity="0.9"></path></svg>',
})
export class TIconFilePasteComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'file-paste';
}
