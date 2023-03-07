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
  selector: 't-icon-forward',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M14.76 7.6a.5.5 0 010 .8l-5.64 4.5a.5.5 0 01-.81-.4V8.23a.5.5 0 01-.12.15l-5.37 4.48a.5.5 0 01-.82-.39V3.53c0-.43.5-.66.82-.39l5.37 4.48c.05.04.09.09.12.15V3.5a.5.5 0 01.81-.4l5.64 4.5zM9.3 4.55v6.92L13.64 8 9.31 4.54zM3 4.6v6.8L7.09 8 3 4.6z" fill-opacity="0.9"></path></svg>',
})
export class TIconForwardComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'forward';
}
