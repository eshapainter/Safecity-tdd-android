import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SafteytipthreePageRoutingModule } from './safteytipthree-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SafteytipthreePage } from './safteytipthree.page';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SafteytipthreePageRoutingModule
  ],
  declarations: [SafteytipthreePage]
})
export class SafteytipthreePageModule {}
