import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewsafteydetailPage } from './viewsafteydetail.page';

const routes: Routes = [
  {
    path: '',
    component: ViewsafteydetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsafteydetailPageRoutingModule {}
