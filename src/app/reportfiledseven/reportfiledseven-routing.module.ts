import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportfiledsevenPage } from './reportfiledseven.page';

const routes: Routes = [
  {
    path: '',
    component: ReportfiledsevenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportfiledsevenPageRoutingModule {}
