import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MysafetyreportPageRoutingModule } from './mysafetyreport-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MysafetyreportPage } from './mysafetyreport.page';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MysafetyreportPageRoutingModule
  ],
  declarations: [MysafetyreportPage]
})
export class MysafetyreportPageModule {}
