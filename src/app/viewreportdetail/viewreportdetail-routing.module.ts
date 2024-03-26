import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewreportdetailPage } from './viewreportdetail.page';

const routes: Routes = [
  {
    path: '',
    component: ViewreportdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewreportdetailPageRoutingModule {}
