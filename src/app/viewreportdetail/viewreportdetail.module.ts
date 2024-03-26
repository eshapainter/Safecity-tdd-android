import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewreportdetailPageRoutingModule } from './viewreportdetail-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ViewreportdetailPage } from './viewreportdetail.page';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ViewreportdetailPageRoutingModule
  ],
  declarations: [ViewreportdetailPage]
})
export class ViewreportdetailPageModule {}
