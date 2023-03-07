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
  selector: 't-icon-logo-apple',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M8.29 4a2.57 2.57 0 002.57-2.56V1h-.44a2.57 2.57 0 00-2.57 2.57V4h.44zm1.29-1.27c-.26.26-.6.44-.95.5a1.82 1.82 0 011.45-1.45c-.06.35-.24.69-.5.95zM12.7 5.09c.22.18.43.4.63.67a3.04 3.04 0 00.37 5.5l-.05.15a7.28 7.28 0 01-.95 1.84c-.6.86-1.22 1.71-2.2 1.73-.47 0-.78-.13-1.11-.26a2.92 2.92 0 00-2.58 0c-.31.14-.6.26-1.03.28-.95.03-1.66-.93-2.27-1.78-1.23-1.74-2.17-4.91-.9-7.06A3.51 3.51 0 015.56 4.4c.53-.01 1.04.19 1.48.36.34.13.65.25.89.25.22 0 .5-.1.83-.23.53-.2 1.2-.46 1.93-.4a3.6 3.6 0 012 .71zm-2.06.18h-.01c-.4-.03-.8.08-1.24.24a21.05 21.05 0 00-.65.24c-.2.07-.5.16-.8.16-.3 0-.56-.07-.76-.14L6.7 5.6l-.14-.06c-.4-.15-.7-.24-.98-.23-.9 0-1.73.5-2.21 1.31-.48.82-.58 1.9-.37 3.06a7.87 7.87 0 002.12 4.1c.28.26.48.32.62.32.25-.02.41-.08.74-.22l.05-.02a3.9 3.9 0 013.18.02c.33.14.5.2.76.2h.01c.2-.01.4-.1.65-.32.26-.24.52-.58.82-1.02.27-.39.47-.77.61-1.08a3.88 3.88 0 01-1.7-3.23 3.84 3.84 0 011.1-2.74c-.5-.33-1.05-.4-1.33-.42z" fill-opacity="0.9"></path></svg>',
})
export class TIconLogoAppleComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'logo-apple';
}
