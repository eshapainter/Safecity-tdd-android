import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndecentipcPageRoutingModule } from './indecentipc-routing.module';

import { IndecentipcPage } from './indecentipc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndecentipcPageRoutingModule
  ],
  declarations: [IndecentipcPage]
})
export class IndecentipcPageModule {}
