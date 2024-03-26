import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonatePageRoutingModule } from './donate-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { DonatePage } from './donate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,TranslateModule,
    DonatePageRoutingModule
  ],
  declarations: [DonatePage]
})
export class DonatePageModule {}
