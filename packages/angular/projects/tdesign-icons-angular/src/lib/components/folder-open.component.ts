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
  selector: 't-icon-folder-open',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M2.5 2.74h3.93L8.5 4.4h5v-1H8.85L6.78 1.74H2.5v1zM2.5 4.4a1 1 0 00-1 1V13a1 1 0 001 1h11a1 1 0 001-1V7.05a1 1 0 00-1-1H8.17L6.1 4.39H2.5zm0 1h3.25l2.08 1.65h5.67V13h-11V5.4z" fill-opacity="0.9"></path></svg>',
})
export class TIconFolderOpenComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'folder-open';
}
