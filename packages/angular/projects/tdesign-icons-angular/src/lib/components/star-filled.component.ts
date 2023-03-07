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
  selector: 't-icon-star-filled',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M7.6 1.82a.45.45 0 01.8 0l1.8 3.65 4.03.58c.37.05.52.5.25.77l-2.91 2.84.69 4a.45.45 0 01-.66.48L8 12.25l-3.6 1.9a.45.45 0 01-.65-.48l.68-4.01-2.9-2.84a.45.45 0 01.24-.77l4.03-.58 1.8-3.65z" fill-opacity="0.9"></path></svg>',
})
export class TIconStarFilledComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'star-filled';
}
