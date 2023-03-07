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
  selector: 't-icon-browse-off',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M10.77 11.98l1.38 1.37.7-.7-9.7-9.7-.7.7 1.2 1.21a7.9 7.9 0 00-2.53 2.91L1 8l.12.23a7.72 7.72 0 009.65 3.75zM10 11.2A6.67 6.67 0 012.11 8c.56-1 1.34-1.83 2.26-2.43l1.08 1.09a2.88 2.88 0 003.9 3.9l.64.64zM6.21 7.42l2.37 2.37a1.88 1.88 0 01-2.37-2.37zM14.88 8.23L15 8l-.12-.23a7.73 7.73 0 00-9.35-3.86l.8.8A6.7 6.7 0 0113.9 8a6.87 6.87 0 01-2.02 2.26l.7.7a7.9 7.9 0 002.3-2.73z" fill-opacity="0.9"></path><path fill="currentColor" d="M10.88 8c0 .37-.07.73-.2 1.06l-.82-.82.02-.24a1.88 1.88 0 00-2.12-1.86l-.82-.82A2.87 2.87 0 0110.88 8z" fill-opacity="0.9"></path></svg>',
})
export class TIconBrowseOffComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'browse-off';
}
