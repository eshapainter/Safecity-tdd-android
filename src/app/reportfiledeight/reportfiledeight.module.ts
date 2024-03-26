import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportfiledeightPageRoutingModule } from './reportfiledeight-routing.module';

import { ReportfiledeightPage } from './reportfiledeight.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportfiledeightPageRoutingModule
  ],
  declarations: [ReportfiledeightPage]
})
export class ReportfiledeightPageModule {}
