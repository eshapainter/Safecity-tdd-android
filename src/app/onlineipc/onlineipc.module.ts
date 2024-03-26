import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineipcPageRoutingModule } from './onlineipc-routing.module';

import { OnlineipcPage } from './onlineipc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineipcPageRoutingModule
  ],
  declarations: [OnlineipcPage]
})
export class OnlineipcPageModule {}
