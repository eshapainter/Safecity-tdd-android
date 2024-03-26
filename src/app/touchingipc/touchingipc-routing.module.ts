import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TouchingipcPage } from './touchingipc.page';

const routes: Routes = [
  {
    path: '',
    component: TouchingipcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TouchingipcPageRoutingModule {}
