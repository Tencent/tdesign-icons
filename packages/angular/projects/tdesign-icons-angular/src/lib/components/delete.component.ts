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
  selector: 't-icon-delete',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M6 12V6h1v6H6zM9 6v6h1V6H9z" fill-opacity="0.9"></path><path fill="currentColor" d="M10.5 3H14v1h-1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V4H2V3h3.5V1.8c0-.44.36-.8.8-.8h3.4c.44 0 .8.36.8.8V3zm-4 0h3V2h-3v1zM4 4v10h8V4H4z" fill-opacity="0.9"></path></svg>',
})
export class TIconDeleteComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'delete';
}
