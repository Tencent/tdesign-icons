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
  selector: 't-icon-user-circle',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><g fill="currentColor" opacity="0.9"><path d="M8 9a2.78 2.78 0 100-5.56A2.78 2.78 0 008 9zm0-1a1.78 1.78 0 110-3.56A1.78 1.78 0 018 8z"></path><path d="M8 15A7 7 0 108 1a7 7 0 000 14zm5-3.68A10.2 10.2 0 008 10c-1.79 0-3.47.48-5 1.32a6 6 0 1110 0zm-.64.8a5.98 5.98 0 01-8.72 0 9.17 9.17 0 018.72 0z"></path></g></svg>',
})
export class TIconUserCircleComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'user-circle';
}
