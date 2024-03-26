import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SafteytiponePage } from './safteytipone.page';

const routes: Routes = [
  {
    path: '',
    component: SafteytiponePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SafteytiponePageRoutingModule {}
