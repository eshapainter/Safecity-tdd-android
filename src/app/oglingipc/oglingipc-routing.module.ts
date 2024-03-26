import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OglingipcPage } from './oglingipc.page';

const routes: Routes = [
  {
    path: '',
    component: OglingipcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OglingipcPageRoutingModule {}
