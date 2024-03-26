import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreframingPage } from './preframing.page';

const routes: Routes = [
  {
    path: '',
    component: PreframingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreframingPageRoutingModule {}
