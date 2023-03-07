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
  selector: 't-icon-gift',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M3.5 4c0 .56.19 1.08.5 1.5H2.5A.5.5 0 002 6v8c0 .28.22.5.5.5h11a.5.5 0 00.5-.5V6a.5.5 0 00-.5-.5H12a2.5 2.5 0 00-4-3A2.5 2.5 0 003.5 4zm8 0c0 .83-.67 1.5-1.5 1.5H8.5V4a1.5 1.5 0 113 0zm-4 2.5V11h1V6.5H13v7H3v-7h4.5zm0-1H6A1.5 1.5 0 117.5 4v1.5z" fill-opacity="0.9"></path></svg>',
})
export class TIconGiftComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'gift';
}
