import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnboardingfourPage } from './onboardingfour.page';

const routes: Routes = [
  {
    path: '',
    component: OnboardingfourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingfourPageRoutingModule {}
