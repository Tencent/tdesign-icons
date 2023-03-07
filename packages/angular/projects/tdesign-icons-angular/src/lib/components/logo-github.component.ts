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
  selector: 't-icon-logo-github',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../style/index.css'],
  template: '<svg [ngClass]="_classes" [ngStyle]="_styles" fill="none" viewBox="0 0 16 16" width="1em" height="1em"><path fill="currentColor" d="M5.5 14.5v-1.8h-.9c-.73 0-1.32-.6-1.32-1.32 0-.25-.2-.46-.46-.46H2.1v-.85h.73a1.31 1.31 0 011.31 1.31.46.46 0 00.46.46h.91v-.38a2 2 0 01.22-.9 6.12 6.12 0 01-.92-.4l-.02-.01c-.5-.27-.94-.6-1.29-.98-.63-.67-1-1.49-1-2.37 0-.85.34-1.64.92-2.29l-.05-.22c-.2-.96 0-1.96.54-2.78a3.7 3.7 0 012.68.92l.36.31a7.26 7.26 0 012.17.02l.37-.33a3.7 3.7 0 012.68-.92c.54.82.74 1.82.54 2.78l-.07.33c.52.63.82 1.38.82 2.18 0 1.38-.9 2.6-2.28 3.35-.29.15-.6.29-.92.4a2 2 0 01.25.97v2.98h-5zM7.08 3.73l-.46.07-.7-.62a2.7 2.7 0 00-1.43-.66 2.7 2.7 0 00-.15 1.57l.15.7-.33.38c-.45.5-.67 1.06-.67 1.63 0 1.1.9 2.25 2.55 2.81l1.09.37-.52 1.03a1 1 0 00-.11.45v2.04h3v-1.98a1 1 0 00-.12-.49L8.8 10l1.13-.39c1.64-.56 2.52-1.71 2.52-2.8 0-.54-.2-1.06-.59-1.54l-.3-.37.16-.8a2.7 2.7 0 00-.15-1.57 2.7 2.7 0 00-1.43.66l-.72.64-.47-.08a6.25 6.25 0 00-1.87 0z" fill-opacity="0.9"></path></svg>',
})
export class TIconLogoGithubComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') public hostAttrDataTIcon = true;

  @HostBinding('class.t-icon-container') public tIconContainerClass = true;

  protected name = 'logo-github';
}
