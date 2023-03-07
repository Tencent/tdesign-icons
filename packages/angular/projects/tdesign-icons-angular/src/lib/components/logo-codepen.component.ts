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
  selector: 't-icon-logo-codepen',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M1.53 5.59a.5.5 0 00-.21.47v3.88a.5.5 0 00.21.47l6.19 4.23c.17.12.4.12.56 0l6.19-4.23a.5.5 0 00.21-.46v-3.9a.5.5 0 00-.21-.46L8.28 1.36a.5.5 0 00-.56 0L1.53 5.59zm.9.41l5.14-3.52v2.97L4.61 7.5 2.43 6zm6-.55V2.48L13.56 6l-2.18 1.49-2.97-2.04zM3.84 8L2.17 9.15v-2.3L3.85 8zm9.98-1.15v2.3L12.15 8l1.68-1.15zM11.4 8.5L13.57 10l-5.15 3.52v-2.97L11.4 8.5zm-3.82 2.04v2.97L2.43 10l2.18-1.49 2.96 2.04zM10.64 8L8 9.8 5.36 8 8 6.2 10.64 8z" fill-opacity="0.9"></path></svg>',
})
export class TIconLogoCodepenComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'logo-codepen';
}
