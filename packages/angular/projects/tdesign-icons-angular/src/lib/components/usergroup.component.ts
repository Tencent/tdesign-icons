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
  selector: 't-icon-usergroup',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M6 1c.53 0 1.02.12 1.46.35l-.63.8a2.24 2.24 0 00-3.08 2.1c0 1.23.98 2.22 2.2 2.25v1A3.25 3.25 0 016 1zM.54 9.44c1.65-.78 3.48-1.21 5.41-1.22v1c-1.77 0-3.44.4-4.95 1.1V12h1.86v1H.5a.5.5 0 01-.5-.5v-2.2c0-.36.2-.7.54-.86z"></path><path fill="currentColor" d="M10 8.31a3.25 3.25 0 110-6.5 3.25 3.25 0 010 6.5zm0-1a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zM16 11.52c0-.37-.2-.72-.54-.87a12.83 12.83 0 00-10.92 0 .96.96 0 00-.54.87V14c0 .28.22.5.5.5h11a.5.5 0 00.5-.5v-2.48zm-1 .01v1.97H5v-1.97a11.83 11.83 0 0110 0z"></path></svg>',
})
export class TIconUsergroupComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'usergroup';
}
