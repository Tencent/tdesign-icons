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
  selector: 't-icon-chevron-down-rectangle',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M10.8 6.2L8 9 5.2 6.2l-.7.71 3.5 3.5 3.5-3.5-.7-.7z" fill-opacity="0.9"></path><path fill="currentColor" d="M14 13a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1h10a1 1 0 011 1v10zm-1 0V3H3v10h10z" fill-opacity="0.9"></path></svg>',
})
export class TIconChevronDownRectangleComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'chevron-down-rectangle';
}
