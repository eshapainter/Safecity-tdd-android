import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StakingipcPage } from './stakingipc.page';

const routes: Routes = [
  {
    path: '',
    component: StakingipcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StakingipcPageRoutingModule {}
