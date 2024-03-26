import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TouchingipcPageRoutingModule } from './touchingipc-routing.module';

import { TouchingipcPage } from './touchingipc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TouchingipcPageRoutingModule
  ],
  declarations: [TouchingipcPage]
})
export class TouchingipcPageModule {}
