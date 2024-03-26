import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TakingphotoipcPage } from './takingphotoipc.page';

const routes: Routes = [
  {
    path: '',
    component: TakingphotoipcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TakingphotoipcPageRoutingModule {}
