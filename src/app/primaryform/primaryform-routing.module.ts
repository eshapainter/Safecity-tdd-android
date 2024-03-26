import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrimaryformPage } from './primaryform.page';

const routes: Routes = [
  {
    path: '',
    component: PrimaryformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrimaryformPageRoutingModule {}
