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
  selector: 't-icon-relativity',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M5.5 5.5h-3a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1v-3h3a1 1 0 001-1v-7a1 1 0 00-1-1h-7a1 1 0 00-1 1v3zm1-3h7v7h-3v-3a1 1 0 00-1-1h-3v-3zm3 8v3h-7v-7h3v3a1 1 0 001 1h3zm0-1h-3v-3h3v3z" fill-opacity="0.9"></path></svg>',
})
export class TIconRelativityComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'relativity';
}
