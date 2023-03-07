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
  selector: 't-icon-home',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M6 11v1h4v-1H6z" fill-opacity="0.9"></path><path fill="currentColor" d="M7.65 1.65c.2-.2.5-.2.7 0l6.5 6.5-.7.7L13 7.71v5.79a1 1 0 01-1 1H4a1 1 0 01-1-1V7.7L1.85 8.86l-.7-.7 6.5-6.5zM8 2.7l-4 4v6.79h8V6.7l-4-4z" fill-opacity="0.9"></path></svg>',
})
export class TIconHomeComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'home';
}
