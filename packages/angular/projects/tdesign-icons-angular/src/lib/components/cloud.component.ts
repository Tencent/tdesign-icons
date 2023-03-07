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
  selector: 't-icon-cloud',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M4.73 7.26l.15-.7A3.2 3.2 0 018 4a3.2 3.2 0 013.12 2.56l.15.7.71.08A2.32 2.32 0 0114 9.67 2.3 2.3 0 0111.73 12H4.27A2.3 2.3 0 012 9.67c0-1.22.9-2.2 2.02-2.33l.71-.08zm7.37-.9A4.2 4.2 0 008 3a4.2 4.2 0 00-4.1 3.35A3.32 3.32 0 001 9.67 3.3 3.3 0 004.27 13h7.46A3.3 3.3 0 0015 9.67a3.32 3.32 0 00-2.9-3.32z" fill-opacity="0.9"></path></svg>',
})
export class TIconCloudComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'cloud';
}
