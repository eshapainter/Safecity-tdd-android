import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgopartnerPageRoutingModule } from './ngopartner-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgopartnerPage } from './ngopartner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,TranslateModule,
    IonicModule,
    NgopartnerPageRoutingModule
  ],
  declarations: [NgopartnerPage]
})
export class NgopartnerPageModule {}
