import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SexualassaultipcPageRoutingModule } from './sexualassaultipc-routing.module';

import { SexualassaultipcPage } from './sexualassaultipc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SexualassaultipcPageRoutingModule
  ],
  declarations: [SexualassaultipcPage]
})
export class SexualassaultipcPageModule {}
