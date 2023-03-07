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
  selector: 't-icon-file-excel',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M3.5 2v12H8v1H3.5c-.48 0-1-.34-1-.92V1.92c0-.58.52-.92 1-.92h5.37a1 1 0 01.71.3L13.21 5a1 1 0 01.29.7v1.8h-1V6.01h-4V2h-5zm6 .65V5h2.32L9.5 2.65z" fill-opacity="0.9"></path><path fill="currentColor" d="M10.34 9.8v-.85h-1v.84c0 .26.08.51.25.71l1.19 1.48-1.2 1.48c-.16.2-.24.46-.24.71v.84h1v-.84c0-.03 0-.06.03-.08l1.05-1.3 1.05 1.3c.02.02.03.05.03.08v.84h1v-.84c0-.25-.09-.5-.25-.7l-1.19-1.49 1.19-1.48c.16-.2.25-.45.25-.7v-.85h-1v.84l-.03.09-1.05 1.3-1.05-1.3a.13.13 0 01-.03-.09z" fill-opacity="0.9"></path></svg>',
})
export class TIconFileExcelComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'file-excel';
}
