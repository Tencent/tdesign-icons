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
  selector: 't-icon-jump',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M2.3 13.7a1 1 0 00.7.3h10a1 1 0 001-1V8.5h-1V13H3V3h4.5V2H3a1 1 0 00-1 1v10c0 .27.1.52.3.7z" fill-opacity="0.9"></path><path fill="currentColor" d="M9 3V2h4.5c.28 0 .5.22.5.5V7h-1V3.7L8.7 8 8 7.3 12.3 3H9z" fill-opacity="0.9"></path></svg>',
})
export class TIconJumpComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'jump';
}
