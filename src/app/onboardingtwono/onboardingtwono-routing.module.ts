import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnboardingtwonoPage } from './onboardingtwono.page';

const routes: Routes = [
  {
    path: '',
    component: OnboardingtwonoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingtwonoPageRoutingModule {}
