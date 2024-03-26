import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportfiledtwoPage } from './reportfiledtwo.page';

const routes: Routes = [
  {
    path: '',
    component: ReportfiledtwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportfiledtwoPageRoutingModule {}
