import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportfiledtenPageRoutingModule } from './reportfiledten-routing.module';

import { ReportfiledtenPage } from './reportfiledten.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportfiledtenPageRoutingModule
  ],
  declarations: [ReportfiledtenPage]
})
export class ReportfiledtenPageModule {}
