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
  selector: 't-icon-file-copy',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M4 1.92C4 1.34 4.52 1 5 1h4.37a1 1 0 01.71.3L13.71 5a1 1 0 01.29.7v6.38c0 .58-.52.92-1 .92H5c-.48 0-1-.34-1-.92V1.92zM5 2v10h8V6.01H9V2H5zm5 .65V5h2.32L10 2.65z" fill-opacity="0.9"></path><path fill="currentColor" d="M2 5v9.01a1 1 0 001 1h8v-1H3V5H2z" fill-opacity="0.9"></path></svg>',
})
export class TIconFileCopyComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'file-copy';
}
