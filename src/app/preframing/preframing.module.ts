import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreframingPageRoutingModule } from './preframing-routing.module';

import { PreframingPage } from './preframing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreframingPageRoutingModule
  ],
  declarations: [PreframingPage]
})
export class PreframingPageModule {}
