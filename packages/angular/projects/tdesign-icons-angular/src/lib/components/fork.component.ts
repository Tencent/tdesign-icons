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
  selector: 't-icon-fork',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M6 2.5c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5v3a.5.5 0 01-.5.5h-1v2h3a1 1 0 011 1v1h1c.28 0 .5.22.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3c0-.28.22-.5.5-.5h1V9h-7v1h1c.28 0 .5.22.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3c0-.28.22-.5.5-.5h1V9a1 1 0 011-1h3V6h-1a.5.5 0 01-.5-.5v-3zM7 5h2V3H7v2zm-4 6v2h2v-2H3zm8 0v2h2v-2h-2z" fill-opacity="0.9"></path></svg>',
})
export class TIconForkComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'fork';
}
