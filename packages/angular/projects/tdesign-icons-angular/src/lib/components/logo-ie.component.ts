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
  selector: 't-icon-logo-ie',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M5.34 7.31c.27-.3.56-.62.87-.92h3.61a1.87 1.87 0 00-2.06-1.4c.37-.29.74-.56 1.11-.8a2.8 2.8 0 011.94 2.66v.46H5.34z" fill-opacity="0.9"></path><path fill="currentColor" d="M3.74 15a2.72 2.72 0 01-2-.73A2.72 2.72 0 011 12.26a6.3 6.3 0 01.69-2.62 6.54 6.54 0 017.95-7.95l.33-.15A6.3 6.3 0 0112.26 1c.72 0 1.46.18 2 .73.56.55.75 1.3.74 2.01a6.3 6.3 0 01-.67 2.6 6.54 6.54 0 01.14 2.68l-.06.4H6.2a1.87 1.87 0 003.3.65l.14-.19h4.66l-.27.65a6.53 6.53 0 01-7.7 3.8l-.31.13a6.3 6.3 0 01-2.29.54zm1.3-1.17a6.56 6.56 0 01-2.38-2.08c.1-.34.24-.7.42-1.09a5.6 5.6 0 009.78.15H10.1a2.8 2.8 0 01-4.89-1.86v-.47h8.38c.02-.15.02-.3.02-.47a5.6 5.6 0 00-2.85-4.87c.4-.17.78-.3 1.13-.39.8.6 1.48 1.38 1.94 2.29.37-1.15.32-2.1-.22-2.65-1.28-1.27-4.82.2-7.92 3.3-3.1 3.1-4.57 6.64-3.3 7.92.54.54 1.5.59 2.65.22zm3.24-11.4l-.27-.02a5.6 5.6 0 00-5.59 5.87 18.3 18.3 0 012.61-3.25 18.3 18.3 0 013.25-2.6z" fill-opacity="0.9"></path></svg>',
})
export class TIconLogoIeComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'logo-ie';
}
