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
  selector: 't-icon-logo-ie-filled',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M11.57 9.04h3.4a6.03 6.03 0 00-.82-3.74c.56-1.43.54-2.64-.21-3.36-.71-.68-2.62-.57-4.78.35a6.3 6.3 0 00-6.63 4.58 8.74 8.74 0 013.22-2.58l-.93.88C1.37 8.48.28 12.81 1.45 13.93c.9.85 2.5.7 4.35-.16.87.42 1.84.66 2.87.66a6.31 6.31 0 005.99-4.11h-3.42a2.8 2.8 0 01-2.45 1.4 2.8 2.8 0 01-2.45-1.4A2.6 2.6 0 016 9.05v-.01h5.56zM6 7.44a2.62 2.62 0 012.66-2.42 2.62 2.62 0 012.66 2.42H6.01zm7.9-4.83c.48.47.47 1.33.06 2.4a6.3 6.3 0 00-2.95-2.3c1.3-.54 2.35-.61 2.89-.1zM2.35 13.71c-.62-.59-.43-1.83.36-3.32a6.16 6.16 0 002.7 3.16c-1.38.6-2.5.7-3.06.17z" fill-opacity="0.9"></path></svg>',
})
export class TIconLogoIeFilledComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'logo-ie-filled';
}
