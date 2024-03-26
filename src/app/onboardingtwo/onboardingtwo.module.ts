import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { OnboardingtwoPageRoutingModule } from './onboardingtwo-routing.module';

import { OnboardingtwoPage } from './onboardingtwo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,TranslateModule,
    OnboardingtwoPageRoutingModule
  ],
  declarations: [OnboardingtwoPage]
})
export class OnboardingtwoPageModule {}
