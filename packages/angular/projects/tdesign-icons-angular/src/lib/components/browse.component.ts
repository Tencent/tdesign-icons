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
  selector: 't-icon-browse',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M10.88 8a2.88 2.88 0 11-5.76 0 2.88 2.88 0 015.76 0zm-1 0a1.88 1.88 0 10-3.76 0 1.88 1.88 0 003.76 0z" fill-opacity="0.9"></path><path fill="currentColor" d="M1.12 8.23A7.72 7.72 0 008 12.5c2.9 0 5.54-1.63 6.88-4.27L15 8l-.12-.23A7.73 7.73 0 008 3.5a7.74 7.74 0 00-6.88 4.27L1 8l.12.23zM8 11.5A6.73 6.73 0 012.11 8 6.73 6.73 0 0113.9 8 6.74 6.74 0 018 11.5z" fill-opacity="0.9"></path></svg>',
})
export class TIconBrowseComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'browse';
}
