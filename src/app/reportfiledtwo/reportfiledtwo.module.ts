import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportfiledtwoPageRoutingModule } from './reportfiledtwo-routing.module';

import { ReportfiledtwoPage } from './reportfiledtwo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportfiledtwoPageRoutingModule
  ],
  declarations: [ReportfiledtwoPage]
})
export class ReportfiledtwoPageModule {}
