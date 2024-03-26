import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentfilterPage } from './incidentfilter.page';

const routes: Routes = [
  {
    path: '',
    component: IncidentfilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentfilterPageRoutingModule {}
