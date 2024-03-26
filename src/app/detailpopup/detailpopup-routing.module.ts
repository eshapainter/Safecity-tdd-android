import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailpopupPage } from './detailpopup.page';

const routes: Routes = [
  {
    path: '',
    component: DetailpopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailpopupPageRoutingModule {}
