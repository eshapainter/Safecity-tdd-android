import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChainsnachtingipcPageRoutingModule } from './chainsnachtingipc-routing.module';

import { ChainsnachtingipcPage } from './chainsnachtingipc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChainsnachtingipcPageRoutingModule
  ],
  declarations: [ChainsnachtingipcPage]
})
export class ChainsnachtingipcPageModule {}
