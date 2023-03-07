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
  selector: 't-icon-logo-qq',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M13.48 9.77c-.13-.4-.3-.87-.47-1.32l-.63-1.57v-.49C12.39 3.7 11.13 1 8 1S3.6 3.7 3.6 6.39l.01.49-.63 1.57c-.17.45-.34.92-.46 1.32-.6 1.91-.4 2.7-.26 2.73.32.03 1.23-1.45 1.23-1.45 0 .86.44 1.98 1.4 2.79-.36.1-.8.28-1.08.48-.25.2-.22.38-.18.46.2.34 3.44.21 4.37.1.93.11 4.16.24 4.36-.1.05-.08.08-.27-.17-.46a3.9 3.9 0 00-1.08-.48c.96-.81 1.4-1.93 1.4-2.79 0 0 .9 1.48 1.22 1.45.15-.02.34-.81-.25-2.73z" fill-opacity="0.9"></path></svg>',
})
export class TIconLogoQqComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'logo-qq';
}
