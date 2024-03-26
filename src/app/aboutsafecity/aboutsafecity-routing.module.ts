import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutsafecityPage } from './aboutsafecity.page';

const routes: Routes = [
  {
    path: '',
    component: AboutsafecityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutsafecityPageRoutingModule {}
