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
  selector: 't-icon-close-rectangle',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M4.82 10.47L7.29 8 4.82 5.53l.7-.71L8 7.29l2.47-2.47.71.7L8.71 8l2.47 2.47-.7.71L8 8.71l-2.47 2.47-.71-.7z" fill-opacity="0.9"></path><path fill="currentColor" d="M3 14a1 1 0 01-1-1V3a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H3zm0-1h10V3H3v10z" fill-opacity="0.9"></path></svg>',
})
export class TIconCloseRectangleComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'close-rectangle';
}
