import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportfiledeightPage } from './reportfiledeight.page';

const routes: Routes = [
  {
    path: '',
    component: ReportfiledeightPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportfiledeightPageRoutingModule {}
