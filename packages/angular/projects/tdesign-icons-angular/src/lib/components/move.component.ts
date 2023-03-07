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
  selector: 't-icon-move',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M5 1a1 1 0 100 2 1 1 0 000-2zM11 1a1 1 0 100 2 1 1 0 000-2zM4 6a1 1 0 112 0 1 1 0 01-2 0zM11 5a1 1 0 100 2 1 1 0 000-2zM4 10a1 1 0 112 0 1 1 0 01-2 0zM5 13a1 1 0 100 2 1 1 0 000-2zM10 10a1 1 0 112 0 1 1 0 01-2 0zM11 13a1 1 0 100 2 1 1 0 000-2z" fill-opacity="0.9"></path></svg>',
})
export class TIconMoveComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'move';
}
