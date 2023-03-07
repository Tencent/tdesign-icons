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
  selector: 't-icon-wifi',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M10.15 10.7l.7-.71a4.03 4.03 0 00-2.87-1.3c-1.02 0-2.01.45-2.83 1.27l.7.71a3.03 3.03 0 012.13-.98c.74 0 1.5.32 2.17 1.01zM12.18 8.63l.7-.72a6.83 6.83 0 00-4.9-2.2c-1.77 0-3.49.77-4.86 2.17l.7.72A5.83 5.83 0 018 6.7c1.49 0 2.98.66 4.19 1.92z" fill-opacity="0.9"></path><path fill="currentColor" d="M14.13 6.62l.7-.71A9.53 9.53 0 008 2.85a9.53 9.53 0 00-6.82 3.03l.7.71a8.54 8.54 0 016.12-2.74c2.22 0 4.4.97 6.14 2.77zM9 12.5a1 1 0 11-2 0 1 1 0 012 0z" fill-opacity="0.9"></path></svg>',
})
export class TIconWifiComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'wifi';
}
