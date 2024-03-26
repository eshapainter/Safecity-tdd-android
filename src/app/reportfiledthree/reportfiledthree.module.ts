import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportfiledthreePageRoutingModule } from './reportfiledthree-routing.module';

import { ReportfiledthreePage } from './reportfiledthree.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportfiledthreePageRoutingModule
  ],
  declarations: [ReportfiledthreePage]
})
export class ReportfiledthreePageModule {}
