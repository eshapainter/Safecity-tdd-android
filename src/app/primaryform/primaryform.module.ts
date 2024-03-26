import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrimaryformPageRoutingModule } from './primaryform-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PrimaryformPage } from './primaryform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,TranslateModule,
    PrimaryformPageRoutingModule
  ],
  declarations: [PrimaryformPage]
})
export class PrimaryformPageModule {}
