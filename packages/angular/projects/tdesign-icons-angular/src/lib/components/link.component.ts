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
  selector: 't-icon-link',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M6.23 11.89l2.12-2.12.71.7-2.12 2.13A2.5 2.5 0 013.4 9.06l2.13-2.12.7.7-2.12 2.13a1.5 1.5 0 002.12 2.12zM10.47 9.06l-.7-.7 2.12-2.13a1.5 1.5 0 10-2.12-2.12L7.65 6.23l-.71-.7L9.06 3.4a2.5 2.5 0 013.54 3.54l-2.13 2.12z" fill-opacity="0.9"></path><path fill="currentColor" d="M9.06 6.23L6.23 9.06l.71.7 2.83-2.82-.7-.7z" fill-opacity="0.9"></path></svg>',
})
export class TIconLinkComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'link';
}
