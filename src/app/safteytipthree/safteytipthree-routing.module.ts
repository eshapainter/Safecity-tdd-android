import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SafteytipthreePage } from './safteytipthree.page';

const routes: Routes = [
  {
    path: '',
    component: SafteytipthreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SafteytipthreePageRoutingModule {}
