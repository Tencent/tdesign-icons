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
  selector: 't-icon-chevron-left-rectangle',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M9.8 10.8L7 8l2.8-2.8-.71-.7L5.59 8l3.5 3.5.7-.7z" fill-opacity="0.9"></path><path fill="currentColor" d="M3 14a1 1 0 01-1-1V3a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H3zm0-1h10V3H3v10z" fill-opacity="0.9"></path></svg>',
})
export class TIconChevronLeftRectangleComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'chevron-left-rectangle';
}
