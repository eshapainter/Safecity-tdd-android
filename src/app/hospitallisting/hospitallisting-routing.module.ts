import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HospitallistingPage } from './hospitallisting.page';

const routes: Routes = [
  {
    path: '',
    component: HospitallistingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitallistingPageRoutingModule {}
