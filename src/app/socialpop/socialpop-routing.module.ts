import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialpopPage } from './socialpop.page';

const routes: Routes = [
  {
    path: '',
    component: SocialpopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialpopPageRoutingModule {}
