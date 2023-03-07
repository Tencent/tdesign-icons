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
  selector: 't-icon-photo',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M11 8a3 3 0 11-6 0 3 3 0 016 0zm-1 0a2 2 0 10-4 0 2 2 0 004 0z" fill-opacity="0.9"></path><path fill="currentColor" d="M6.05 2a.6.6 0 00-.5.27L4.73 3.5H2.01a.51.51 0 00-.51.51v8.48c0 .28.23.51.51.51h11.98c.28 0 .51-.23.51-.51V4.01a.51.51 0 00-.51-.51h-2.72l-.82-1.23a.6.6 0 00-.5-.27h-3.9zm.22 1h3.46l1 1.5h2.77V12h-11V4.5h2.77l1-1.5z" fill-opacity="0.9"></path></svg>',
})
export class TIconPhotoComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'photo';
}
