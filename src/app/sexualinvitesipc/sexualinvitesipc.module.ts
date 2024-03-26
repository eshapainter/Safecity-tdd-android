import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SexualinvitesipcPageRoutingModule } from './sexualinvitesipc-routing.module';

import { SexualinvitesipcPage } from './sexualinvitesipc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SexualinvitesipcPageRoutingModule
  ],
  declarations: [SexualinvitesipcPage]
})
export class SexualinvitesipcPageModule {}
