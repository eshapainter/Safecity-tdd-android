import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportfiledtwelvePageRoutingModule } from './reportfiledtwelve-routing.module';

import { ReportfiledtwelvePage } from './reportfiledtwelve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportfiledtwelvePageRoutingModule
  ],
  declarations: [ReportfiledtwelvePage]
})
export class ReportfiledtwelvePageModule {}
