import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SexualinvitesipcPage } from './sexualinvitesipc.page';

const routes: Routes = [
  {
    path: '',
    component: SexualinvitesipcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SexualinvitesipcPageRoutingModule {}
