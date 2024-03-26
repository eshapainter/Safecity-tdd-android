import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgopartnerPage } from './ngopartner.page';

const routes: Routes = [
  {
    path: '',
    component: NgopartnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgopartnerPageRoutingModule {}
