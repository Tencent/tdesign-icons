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
  selector: 't-icon-unfold-less',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M4.36 2.13L8 5.8l3.64-3.68.72.7L8.43 6.8a.6.6 0 01-.86 0L3.64 2.83l.72-.7zM4.3 13.83l3.7-3.7 3.7 3.7.7-.7-3.98-3.98a.6.6 0 00-.84 0L3.6 13.12l.7.71z" fill-opacity="0.9"></path></svg>',
})
export class TIconUnfoldLessComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'unfold-less';
}
