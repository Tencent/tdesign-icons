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
  selector: 't-icon-file-word',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M3.5 2v12h3v1h-3c-.48 0-1-.34-1-.92V1.92c0-.58.52-.92 1-.92h5.37a1 1 0 01.71.3L13.21 5a1 1 0 01.29.7V8h-1V6.01h-4V2h-5zm6 .65V5h2.32L9.5 2.65z" fill-opacity="0.9"></path><path fill="currentColor" d="M9 14V9.5H8V14a1 1 0 001 1h3.5a1 1 0 001-1V9.5h-1V14h-1.25V9.5h-1V14H9z" fill-opacity="0.9"></path></svg>',
})
export class TIconFileWordComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'file-word';
}
