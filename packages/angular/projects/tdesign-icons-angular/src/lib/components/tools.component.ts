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
  selector: 't-icon-tools',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M9.75 8.25l.56.15c1 .28 2.09.03 2.85-.73.67-.67.94-1.6.8-2.5l-1.05 1.05a1.5 1.5 0 01-2.12 0l-.43-.42a1.5 1.5 0 010-2.12l1.06-1.06a2.9 2.9 0 00-2.5.8c-.76.77-1.01 1.85-.74 2.85l.16.57-5.8 5.8 1.4 1.41 5.81-5.8zm2.5-6.45c.32.1.64.26.94.46l-2.12 2.12a.5.5 0 000 .71l.42.43c.2.2.52.2.71 0l2.12-2.13a3.92 3.92 0 01-.46 4.98 3.91 3.91 0 01-3.81 1l-5.4 5.4a1 1 0 01-1.41 0l-1.42-1.42a1 1 0 010-1.42l5.4-5.39a3.91 3.91 0 01.99-3.82 3.92 3.92 0 014.03-.92z" fill-opacity="0.9"></path></svg>',
})
export class TIconToolsComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'tools';
}
