import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HumanipcPage } from './humanipc.page';

const routes: Routes = [
  {
    path: '',
    component: HumanipcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HumanipcPageRoutingModule {}
