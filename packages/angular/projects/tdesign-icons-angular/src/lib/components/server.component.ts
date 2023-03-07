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
  selector: 't-icon-server',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M7 5.25H4v-1h3v1z" fill-opacity="0.9"></path><path fill="currentColor" d="M1.5 2.5c0-.28.22-.5.5-.5h12c.28 0 .5.22.5.5V7a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V2.5zm1 4h11V3h-11v3.5zM4 11.75h3v-1H4v1z" fill-opacity="0.9"></path><path fill="currentColor" d="M1.5 9c0-.28.23-.5.5-.5h12c.28 0 .5.22.5.5v4.5a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V9zm1 4h11V9.5h-11V13z" fill-opacity="0.9"></path></svg>',
})
export class TIconServerComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'server';
}
