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
  selector: 't-icon-file-unknown',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M3.5 2v12H9v1H3.5c-.48 0-1-.34-1-.92V1.92c0-.58.52-.92 1-.92h5.29a1 1 0 01.71.3L13.13 5a1 1 0 01.29.7v1.8h-1V6.01h-4V2H3.5zm5.92.65V5h2.32L9.42 2.65z" fill-opacity="0.9"></path><path fill="currentColor" d="M11.42 8.42c-1.07 0-2 .82-2 1.9h1c0-.46.42-.9 1-.9.58 0 1 .44 1 .9 0 .3-.28.66-.72.83-.44.17-.78.6-.78 1.11v.66h1v-.66c0-.07.04-.14.14-.18.66-.25 1.36-.89 1.36-1.76 0-1.08-.93-1.9-2-1.9zM11.42 13.8a.6.6 0 100 1.2.6.6 0 000-1.2z" fill-opacity="0.9"></path></svg>',
})
export class TIconFileUnknownComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'file-unknown';
}
