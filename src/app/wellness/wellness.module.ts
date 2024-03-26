import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { WellnessPageRoutingModule } from './wellness-routing.module';

import { WellnessPage } from './wellness.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,TranslateModule,
    WellnessPageRoutingModule
  ],
  declarations: [WellnessPage]
})
export class WellnessPageModule {}
