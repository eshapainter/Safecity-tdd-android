import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SafteytipThankyouPageRoutingModule } from './safteytip-thankyou-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SafteytipThankyouPage } from './safteytip-thankyou.page';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SafteytipThankyouPageRoutingModule
  ],
  declarations: [SafteytipThankyouPage]
})
export class SafteytipThankyouPageModule {}
