import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TIconComponent } from './tdesign-icons-angular.component';

import { ICON_COMPONENTS } from './icons';

@NgModule({
  imports: [CommonModule],
  declarations: [TIconComponent, ...ICON_COMPONENTS],
  exports: [TIconComponent, ...ICON_COMPONENTS],
})
export class TdesignIconsAngularModule {}
