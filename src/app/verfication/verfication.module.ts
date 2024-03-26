import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerficationPageRoutingModule } from './verfication-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { VerficationPage } from './verfication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    VerficationPageRoutingModule
  ],
  declarations: [VerficationPage]
})
export class VerficationPageModule {}
