import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportfiledfivePage } from './reportfiledfive.page';

const routes: Routes = [
  {
    path: '',
    component: ReportfiledfivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportfiledfivePageRoutingModule {}
