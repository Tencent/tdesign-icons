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
  selector: 't-icon-file-add',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M4 1a1 1 0 00-1 1v11a1 1 0 001 1h4.54v-1H4V2h4v4h4v2.48h1V5.71a1 1 0 00-.3-.71l-.08-.08-3.7-3.71a.53.53 0 00-.3-.15A1 1 0 008.3 1H4zm7.3 4H9V2.7L11.3 5z" fill-opacity="0.9"></path><path fill="currentColor" d="M12 15v-2h-2v-1h2v-2h1v2h2v1h-2v2h-1z" fill-opacity="0.9"></path></svg>',
})
export class TIconFileAddComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'file-add';
}
