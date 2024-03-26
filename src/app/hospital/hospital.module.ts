import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HospitalPageRoutingModule } from './hospital-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { HospitalPage } from './hospital.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,TranslateModule,
    IonicModule,
    HospitalPageRoutingModule
  ],
  declarations: [HospitalPage]
})
export class HospitalPageModule {}
