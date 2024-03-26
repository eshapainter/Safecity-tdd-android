import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnboardingthreePage } from './onboardingthree.page';

const routes: Routes = [
  {
    path: '',
    component: OnboardingthreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingthreePageRoutingModule {}
