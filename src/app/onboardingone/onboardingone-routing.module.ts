import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnboardingonePage } from './onboardingone.page';

const routes: Routes = [
  {
    path: '',
    component: OnboardingonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingonePageRoutingModule {}
