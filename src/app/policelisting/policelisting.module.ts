import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { PolicelistingPageRoutingModule } from './policelisting-routing.module';

import { PolicelistingPage } from './policelisting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,TranslateModule,
    IonicModule,
    PolicelistingPageRoutingModule
  ],
  declarations: [PolicelistingPage]
})
export class PolicelistingPageModule {}
