import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportfiledsixPageRoutingModule } from './reportfiledsix-routing.module';

import { ReportfiledsixPage } from './reportfiledsix.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportfiledsixPageRoutingModule
  ],
  declarations: [ReportfiledsixPage]
})
export class ReportfiledsixPageModule {}
