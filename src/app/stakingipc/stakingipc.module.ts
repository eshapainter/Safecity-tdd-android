import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StakingipcPageRoutingModule } from './stakingipc-routing.module';

import { StakingipcPage } from './stakingipc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StakingipcPageRoutingModule
  ],
  declarations: [StakingipcPage]
})
export class StakingipcPageModule {}
