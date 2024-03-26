import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportfiledtenPage } from './reportfiledten.page';

const routes: Routes = [
  {
    path: '',
    component: ReportfiledtenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportfiledtenPageRoutingModule {}
