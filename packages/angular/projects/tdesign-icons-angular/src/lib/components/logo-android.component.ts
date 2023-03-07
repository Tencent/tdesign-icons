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
  selector: 't-icon-logo-android',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M5.32 8.38a.67.67 0 111.34 0 .67.67 0 01-1.34 0zM10.01 7.7a.67.67 0 100 1.35.67.67 0 000-1.34z" fill-opacity="0.9"></path><path fill="currentColor" d="M2.32 4L4 5.68a6.68 6.68 0 018 0L13.68 4l.71.7-1.63 1.64a6.69 6.69 0 011.95 4.72v.67H1.29v-.67l.01-.33c.08-1.71.8-3.25 1.94-4.4L1.6 4.72 2.3 4zm-.02 6.73h11.4a5.7 5.7 0 00-11.4 0z" fill-opacity="0.9"></path></svg>',
})
export class TIconLogoAndroidComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'logo-android';
}
