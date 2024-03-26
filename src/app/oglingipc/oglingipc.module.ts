import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OglingipcPageRoutingModule } from './oglingipc-routing.module';

import { OglingipcPage } from './oglingipc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OglingipcPageRoutingModule
  ],
  declarations: [OglingipcPage]
})
export class OglingipcPageModule {}
