import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnboardingtwoPage } from './onboardingtwo.page';

const routes: Routes = [
  {
    path: '',
    component: OnboardingtwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingtwoPageRoutingModule {}
