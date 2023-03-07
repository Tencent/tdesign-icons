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
  selector: 't-icon-sound',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M4 11l4.24 2.55a.5.5 0 00.76-.43V2.88a.5.5 0 00-.76-.43L4 5H2.1a.6.6 0 00-.6.6v4.8c0 .33.27.6.6.6H4zm1-5.43l3-1.8v8.46l-3-1.8V5.57zM4 10H2.5V6H4v4zM13.52 5.73a6 6 0 00-1.4-1.95l.68-.73c.7.65 1.25 1.42 1.63 2.27a6.6 6.6 0 01-1.63 7.63l-.68-.73a6 6 0 001.4-1.95 5.6 5.6 0 000-4.54z" fill-opacity="0.9"></path><path fill="currentColor" d="M11.5 8c0-.87-.36-1.75-1.07-2.45l.7-.72c.9.88 1.37 2.02 1.37 3.17 0 1.16-.48 2.29-1.38 3.17l-.7-.72A3.44 3.44 0 0011.5 8z" fill-opacity="0.9"></path></svg>',
})
export class TIconSoundComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'sound';
}
