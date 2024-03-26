import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SafteytipfourPageRoutingModule } from './safteytipfour-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SafteytipfourPage } from './safteytipfour.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    SafteytipfourPageRoutingModule
  ],
  declarations: [SafteytipfourPage]
})
export class SafteytipfourPageModule {}
