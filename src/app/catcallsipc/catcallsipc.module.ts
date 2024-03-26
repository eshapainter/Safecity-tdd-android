import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatcallsipcPageRoutingModule } from './catcallsipc-routing.module';

import { CatcallsipcPage } from './catcallsipc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatcallsipcPageRoutingModule
  ],
  declarations: [CatcallsipcPage]
})
export class CatcallsipcPageModule {}
