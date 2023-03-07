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
  selector: 't-icon-link-unlink',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M6 2v2h1V2H6zM8.18 9.6l-2.3 2.29a1.25 1.25 0 01-1.77-1.77l2.3-2.3-.7-.7-2.3 2.3a2.25 2.25 0 003.18 3.18l2.3-2.3-.71-.7zM9.6 8.18l.7.7 2.3-2.3A2.25 2.25 0 109.4 3.4l-2.3 2.3.71.7 2.3-2.29a1.25 1.25 0 011.77 1.77l-2.3 2.3zM12 9h2v1h-2V9zM2 7h2V6H2v1zM10 12v2H9v-2h1zM11.73 11.03l1.62 1.62-.7.7-1.62-1.62.7-.7zM2.65 3.35l1.62 1.62.7-.7-1.62-1.62-.7.7z" fill-opacity="0.9"></path></svg>',
})
export class TIconLinkUnlinkComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'link-unlink';
}
