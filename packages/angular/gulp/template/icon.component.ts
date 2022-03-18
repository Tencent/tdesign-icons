import {
  Component, ChangeDetectionStrategy, Input, ViewEncapsulation, HostBinding,
} from '@angular/core';
import {
  NgStyleInterface,
  NgClassInterface,
  TIconStandaloneComponent,
  TIconSize,
// @ts-ignore
} from '../tdesign-icons-angular.component';

@Component({
  selector: 't-icon-$KEY',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: '$SVG',
})
export class TIcon$ICON_NAMEComponent extends TIconStandaloneComponent {
  @Input() public styles?: NgStyleInterface;

  @Input() public classes?: NgClassInterface;

  @Input() public size: string | TIconSize = 'default';

  @HostBinding('attr.data-t-icon') protected hostAttrDataTIcon = true;

  @HostBinding('style.line-height') protected hostStyleLineHeight = 0;

  @HostBinding('style.display') protected hostStyleDisplay = 'inline-block';

  protected name = '$KEY';
}
