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
  selector: 't-icon-backward',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M1.24 8.4a.5.5 0 010-.8l5.64-4.5a.5.5 0 01.81.4v4.27a.5.5 0 01.12-.15l5.37-4.48a.5.5 0 01.82.39v8.94a.5.5 0 01-.82.39L7.81 8.38a.5.5 0 01-.12-.15v4.27a.5.5 0 01-.81.4L1.24 8.4zm5.45 3.06V4.54L2.36 8l4.33 3.46zM13 11.4V4.6L8.91 8 13 11.4z" fill-opacity="0.9"></path></svg>',
})
export class TIconBackwardComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'backward';
}
