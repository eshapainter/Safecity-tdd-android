import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportfiledthreePage } from './reportfiledthree.page';

const routes: Routes = [
  {
    path: '',
    component: ReportfiledthreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportfiledthreePageRoutingModule {}
