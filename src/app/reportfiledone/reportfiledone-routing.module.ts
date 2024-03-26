import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportfiledonePage } from './reportfiledone.page';

const routes: Routes = [
  {
    path: '',
    component: ReportfiledonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportfiledonePageRoutingModule {}
