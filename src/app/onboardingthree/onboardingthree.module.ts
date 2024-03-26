import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { OnboardingthreePageRoutingModule } from './onboardingthree-routing.module';

import { OnboardingthreePage } from './onboardingthree.page';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingthreePageRoutingModule
  ],
  declarations: [OnboardingthreePage]
})
export class OnboardingthreePageModule {}
