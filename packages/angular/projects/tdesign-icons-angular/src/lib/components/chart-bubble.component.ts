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
  selector: 't-icon-chart-bubble',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M9 5.5a3 3 0 11-6 0 3 3 0 016 0zm-1 0a2 2 0 10-4 0 2 2 0 004 0zM14 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm-1 0a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM5 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM13 4.5a1 1 0 100-2 1 1 0 000 2z" fill-opacity="0.9"></path></svg>',
})
export class TIconChartBubbleComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'chart-bubble';
}
