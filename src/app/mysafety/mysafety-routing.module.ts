import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MysafetyPage } from './mysafety.page';

const routes: Routes = [
  {
    path: '',
    component: MysafetyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MysafetyPageRoutingModule {}
