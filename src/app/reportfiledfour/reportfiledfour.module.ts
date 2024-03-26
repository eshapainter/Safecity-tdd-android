import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportfiledfourPageRoutingModule } from './reportfiledfour-routing.module';

import { ReportfiledfourPage } from './reportfiledfour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportfiledfourPageRoutingModule
  ],
  declarations: [ReportfiledfourPage]
})
export class ReportfiledfourPageModule {}
