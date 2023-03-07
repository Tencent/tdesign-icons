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
  selector: 't-icon-clear',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M7 4h2V2H7v2zm3-2v2h3a1 1 0 011 1v2a1 1 0 01-.86.99l.7 4.87a1 1 0 01-1 1.14H3.16a1 1 0 01-.99-1.14l.7-4.87A1 1 0 012 7V5a1 1 0 011-1h3V2a1 1 0 011-1h2a1 1 0 011 1zm2.13 5H13V5H3v2H12.13zm0 1H3.87l-.72 5H5v-2h1v2h1.5v-2h1v2H10v-2h1v2h1.85l-.72-5z" fill-opacity="0.9"></path></svg>',
})
export class TIconClearComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'clear';
}
