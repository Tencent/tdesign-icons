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
  selector: 't-icon-logo-apple-filled',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M10.69 1c.08.79-.24 1.58-.7 2.15a2.5 2.5 0 01-2 .96c-.1-.78.27-1.58.7-2.09.5-.57 1.32-1 2-1.02zM13.13 5.6c-.15.1-1.46.92-1.45 2.57.02 2 1.71 2.68 1.8 2.72h.01v.02c-.05.14-.32 1-.93 1.9-.56.83-1.15 1.64-2.07 1.66a2.3 2.3 0 01-1.04-.25c-.32-.14-.65-.29-1.18-.29-.56 0-.9.15-1.24.3-.3.12-.58.24-.97.26-.89.03-1.57-.89-2.13-1.7-1.16-1.68-2.05-4.74-.86-6.8a3.3 3.3 0 012.8-1.7c.49 0 .97.18 1.38.35.32.13.6.24.84.24.2 0 .48-.1.8-.24.52-.2 1.14-.44 1.78-.38a3.15 3.15 0 012.46 1.34z" fill-opacity="0.9"></path></svg>',
})
export class TIconLogoAppleFilledComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'logo-apple-filled';
}
