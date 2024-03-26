import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModelreportPageRoutingModule } from './modelreport-routing.module';

import { ModelreportPage } from './modelreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModelreportPageRoutingModule
  ],
  declarations: [ModelreportPage]
})
export class ModelreportPageModule {}
