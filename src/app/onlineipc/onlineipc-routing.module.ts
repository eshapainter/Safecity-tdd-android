import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlineipcPage } from './onlineipc.page';

const routes: Routes = [
  {
    path: '',
    component: OnlineipcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineipcPageRoutingModule {}
