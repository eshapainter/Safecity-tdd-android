import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HospitallistingPageRoutingModule } from './hospitallisting-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { HospitallistingPage } from './hospitallisting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,TranslateModule,
    HospitallistingPageRoutingModule
  ],
  declarations: [HospitallistingPage]
})
export class HospitallistingPageModule {}
