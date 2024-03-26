import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportfiledsixPage } from './reportfiledsix.page';

const routes: Routes = [
  {
    path: '',
    component: ReportfiledsixPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportfiledsixPageRoutingModule {}
