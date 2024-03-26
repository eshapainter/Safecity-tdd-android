import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicelistingPage } from './policelisting.page';

const routes: Routes = [
  {
    path: '',
    component: PolicelistingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicelistingPageRoutingModule {}
