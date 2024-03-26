import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardingtwonoPageRoutingModule } from './onboardingtwono-routing.module';

import { OnboardingtwonoPage } from './onboardingtwono.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingtwonoPageRoutingModule
  ],
  declarations: [OnboardingtwonoPage]
})
export class OnboardingtwonoPageModule {}
