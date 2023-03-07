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
  selector: 't-icon-shop',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M8 1a2.5 2.5 0 00-2.5 2.5V5h-2a.5.5 0 00-.5.5v9c0 .28.22.5.5.5h9a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5h-2V3.5A2.5 2.5 0 008 1zm1.5 5v2h1V6H12v8H4V6h1.5v2h1V6h3zm0-1h-3V3.5a1.5 1.5 0 113 0V5z" fill-opacity="0.9"></path></svg>',
})
export class TIconShopComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'shop';
}
