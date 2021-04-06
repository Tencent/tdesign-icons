import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import {
  NgStyleInterface,
  NgClassInterface,
  TIconStandaloneComponent,
  TIconSize,
} from '../tdesign-icons-angular.component';

@Component({
  selector: 't-icon-$KEY',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `$SVG`,
  host: {
    '[attr.data-t-icon]': 'true',
    '[style.line-height]': '0',
  },
})
export class TIcon$ICON_NAMEComponent extends TIconStandaloneComponent {
  @Input() styles?: NgStyleInterface;
  @Input() classes?: NgClassInterface;
  @Input() size: string | TIconSize = 'default';

  protected name = '$KEY';
}
