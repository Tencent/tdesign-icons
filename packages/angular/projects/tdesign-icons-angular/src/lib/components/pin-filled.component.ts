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
  selector: 't-icon-pin-filled',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M12.52 1.34a.6.6 0 00-.81-.04L7.66 4.72l-.77-.77a.6.6 0 00-.85 0l-2.1 2.1a.6.6 0 000 .85l2.22 2.23-4.1 4.1.7.71 4.11-4.1 2.23 2.22a.6.6 0 00.85 0l2.1-2.1a.6.6 0 000-.85l-.77-.77 3.42-4.05a.6.6 0 00-.04-.8l-2.14-2.15z" fill-opacity="0.9"></path></svg>',
})
export class TIconPinFilledComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'pin-filled';
}
