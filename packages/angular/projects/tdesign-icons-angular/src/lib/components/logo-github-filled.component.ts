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
  selector: 't-icon-logo-github-filled',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M8 1a7.1 7.1 0 00-7 7.18c0 3.17 2 5.86 4.79 6.8.35.07.46-.15.46-.34v-1.33c-1.95.43-2.35-.85-2.35-.85-.32-.83-.78-1.05-.78-1.05-.64-.45.05-.44.05-.44.7.05 1.07.74 1.07.74.63 1.1 1.64.78 2.04.6.06-.46.24-.78.44-.96-1.55-.18-3.19-.8-3.19-3.55 0-.78.28-1.42.72-1.92-.07-.19-.3-.92.07-1.9 0 0 .6-.2 1.93.73a6.56 6.56 0 013.5 0c1.34-.93 1.93-.73 1.93-.73.38.99.14 1.72.07 1.9.44.5.72 1.14.72 1.92 0 2.76-1.64 3.37-3.2 3.54.25.23.48.66.48 1.33v1.97c0 .2.11.42.47.35A7.17 7.17 0 0015 8.18 7.09 7.09 0 008 1z" fill-opacity="0.9"></path></svg>',
})
export class TIconLogoGithubFilledComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'logo-github-filled';
}
