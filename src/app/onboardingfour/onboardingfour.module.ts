import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { OnboardingfourPageRoutingModule } from './onboardingfour-routing.module';

import { OnboardingfourPage } from './onboardingfour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    OnboardingfourPageRoutingModule
  ],
  declarations: [OnboardingfourPage]
})
export class OnboardingfourPageModule {}
