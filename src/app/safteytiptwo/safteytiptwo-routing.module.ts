import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SafteytiptwoPage } from './safteytiptwo.page';

const routes: Routes = [
  {
    path: '',
    component: SafteytiptwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SafteytiptwoPageRoutingModule {}
