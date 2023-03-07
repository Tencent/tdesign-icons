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
  selector: 't-icon-layers',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M14.07 4.98L8 7.5 1.93 4.98c-.41-.17-.41-.78 0-.95L8 1.5l6.07 2.53c.41.17.41.78 0 .95zM3.43 4.5L8 6.4l4.57-1.9L8 2.6 3.43 4.5z" fill-opacity="0.9"></path><path fill="currentColor" d="M1.5 7.03v1.22L8 11.11l6.5-2.86V7.03L8 9.88 1.5 7.03z" fill-opacity="0.9"></path><path fill="currentColor" d="M1.5 10.42v1.23L8 14.5l6.5-2.85v-1.23L8 13.28l-6.5-2.86z" fill-opacity="0.9"></path></svg>',
})
export class TIconLayersComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'layers';
}
