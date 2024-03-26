import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportfiledninePage } from './reportfilednine.page';

const routes: Routes = [
  {
    path: '',
    component: ReportfiledninePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportfiledninePageRoutingModule {}
