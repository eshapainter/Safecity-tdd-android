import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialpopPageRoutingModule } from './socialpop-routing.module';

import { SocialpopPage } from './socialpop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocialpopPageRoutingModule
  ],
  declarations: [SocialpopPage]
})
export class SocialpopPageModule {}
