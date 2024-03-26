import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerficationPage } from './verfication.page';

const routes: Routes = [
  {
    path: '',
    component: VerficationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerficationPageRoutingModule {}
