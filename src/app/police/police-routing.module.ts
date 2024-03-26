import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicePage } from './police.page';

const routes: Routes = [
  {
    path: '',
    component: PolicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicePageRoutingModule {}
