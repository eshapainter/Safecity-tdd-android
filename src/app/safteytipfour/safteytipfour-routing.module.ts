import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SafteytipfourPage } from './safteytipfour.page';

const routes: Routes = [
  {
    path: '',
    component: SafteytipfourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SafteytipfourPageRoutingModule {}
