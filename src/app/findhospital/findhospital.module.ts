import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindhospitalPageRoutingModule } from './findhospital-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FindhospitalPage } from './findhospital.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,TranslateModule,
    FindhospitalPageRoutingModule
  ],
  declarations: [FindhospitalPage]
})
export class FindhospitalPageModule {}
