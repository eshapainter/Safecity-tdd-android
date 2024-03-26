import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportfiledelevenPage } from './reportfiledeleven.page';

const routes: Routes = [
  {
    path: '',
    component: ReportfiledelevenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportfiledelevenPageRoutingModule {}
