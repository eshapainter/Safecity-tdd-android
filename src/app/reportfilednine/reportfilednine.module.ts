import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportfiledninePageRoutingModule } from './reportfilednine-routing.module';

import { ReportfiledninePage } from './reportfilednine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportfiledninePageRoutingModule
  ],
  declarations: [ReportfiledninePage]
})
export class ReportfiledninePageModule {}
