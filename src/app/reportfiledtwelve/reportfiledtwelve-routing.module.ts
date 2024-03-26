import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportfiledtwelvePage } from './reportfiledtwelve.page';

const routes: Routes = [
  {
    path: '',
    component: ReportfiledtwelvePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportfiledtwelvePageRoutingModule {}
