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
  selector: 't-icon-money-circle',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M10.5 7.5h-2v1h2v1h-2V12h-1V9.5h-2v-1h2v-1h-2v-1h1.46L5.61 4.81l.78-.62L8 6.2l1.61-2.01.78.62L9.04 6.5h1.46v1z" fill-opacity="0.9"></path><path fill="currentColor" d="M15 8A7 7 0 101 8a7 7 0 0014 0zm-1 0A6 6 0 112 8a6 6 0 0112 0z" fill-opacity="0.9"></path></svg>',
})
export class TIconMoneyCircleComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'money-circle';
}
