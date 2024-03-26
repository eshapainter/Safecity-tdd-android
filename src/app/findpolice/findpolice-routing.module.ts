import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindpolicePage } from './findpolice.page';

const routes: Routes = [
  {
    path: '',
    component: FindpolicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindpolicePageRoutingModule {}
