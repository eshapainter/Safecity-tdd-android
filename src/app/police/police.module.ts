import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { PolicePageRoutingModule } from './police-routing.module';

import { PolicePage } from './police.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,TranslateModule,
    IonicModule,
    PolicePageRoutingModule
  ],
  declarations: [PolicePage]
})
export class PolicePageModule {}
