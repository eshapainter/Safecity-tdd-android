import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MysafetyPageRoutingModule } from './mysafety-routing.module';

import { MysafetyPage } from './mysafety.page';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MysafetyPageRoutingModule
  ],
  declarations: [MysafetyPage]
})
export class MysafetyPageModule {}
