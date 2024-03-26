import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TakingphotoipcPageRoutingModule } from './takingphotoipc-routing.module';

import { TakingphotoipcPage } from './takingphotoipc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TakingphotoipcPageRoutingModule
  ],
  declarations: [TakingphotoipcPage]
})
export class TakingphotoipcPageModule {}
