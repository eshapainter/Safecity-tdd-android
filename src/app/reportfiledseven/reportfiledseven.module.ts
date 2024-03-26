import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportfiledsevenPageRoutingModule } from './reportfiledseven-routing.module';

import { ReportfiledsevenPage } from './reportfiledseven.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportfiledsevenPageRoutingModule
  ],
  declarations: [ReportfiledsevenPage]
})
export class ReportfiledsevenPageModule {}
