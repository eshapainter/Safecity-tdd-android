import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportfiledfivePageRoutingModule } from './reportfiledfive-routing.module';

import { ReportfiledfivePage } from './reportfiledfive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportfiledfivePageRoutingModule
  ],
  declarations: [ReportfiledfivePage]
})
export class ReportfiledfivePageModule {}
