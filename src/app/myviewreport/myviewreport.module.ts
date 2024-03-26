import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyviewreportPageRoutingModule } from './myviewreport-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MyviewreportPage } from './myviewreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,TranslateModule.forChild(),
    MyviewreportPageRoutingModule
  ],
  declarations: [MyviewreportPage]
})
export class MyviewreportPageModule {}
