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
  selector: 't-icon-image-error',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M2 13V8h1v2.3l3-3 5.7 5.7H13V3H8V2h5a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1zm4-4.3l-3 3V13h7.3L6 8.7z" fill-opacity="0.9"></path><path fill="currentColor" d="M12 6a2 2 0 11-4 0 2 2 0 014 0zm-1 0a1 1 0 10-2 0 1 1 0 002 0zM6.28 5.56l-.7.7-1.42-1.4-1.41 1.4-.71-.7 1.41-1.41-1.41-1.42.7-.7 1.42 1.4 1.41-1.4.71.7-1.41 1.42 1.41 1.4z" fill-opacity="0.9"></path></svg>',
})
export class TIconImageErrorComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'image-error';
}
