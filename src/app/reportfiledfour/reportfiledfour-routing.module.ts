import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportfiledfourPage } from './reportfiledfour.page';

const routes: Routes = [
  {
    path: '',
    component: ReportfiledfourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportfiledfourPageRoutingModule {}
