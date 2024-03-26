import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatcallsipcPage } from './catcallsipc.page';

const routes: Routes = [
  {
    path: '',
    component: CatcallsipcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatcallsipcPageRoutingModule {}
