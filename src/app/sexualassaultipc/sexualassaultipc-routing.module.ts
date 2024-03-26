import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SexualassaultipcPage } from './sexualassaultipc.page';

const routes: Routes = [
  {
    path: '',
    component: SexualassaultipcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SexualassaultipcPageRoutingModule {}
