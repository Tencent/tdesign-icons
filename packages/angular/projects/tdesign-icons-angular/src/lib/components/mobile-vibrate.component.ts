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
  selector: 't-icon-mobile-vibrate',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M6.5 13h3v-1h-3v1z" fill-opacity="0.9"></path><path fill="currentColor" d="M5 1.5a1 1 0 00-1 1V14a1 1 0 001 1h6a1 1 0 001-1V2.5a1 1 0 00-1-1H5zm6 1V14H5V2.5h6zM2 4v9h1V4H2zM13 4v9h1V4h-1z" fill-opacity="0.9"></path></svg>',
})
export class TIconMobileVibrateComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'mobile-vibrate';
}
