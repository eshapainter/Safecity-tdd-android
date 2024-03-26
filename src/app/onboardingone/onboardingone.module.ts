import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { OnboardingonePageRoutingModule } from './onboardingone-routing.module';

import { OnboardingonePage } from './onboardingone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,TranslateModule,
    OnboardingonePageRoutingModule
  ],
  declarations: [OnboardingonePage]
})
export class OnboardingonePageModule {}
