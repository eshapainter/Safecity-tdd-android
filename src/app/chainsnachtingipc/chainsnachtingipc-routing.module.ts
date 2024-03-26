import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChainsnachtingipcPage } from './chainsnachtingipc.page';

const routes: Routes = [
  {
    path: '',
    component: ChainsnachtingipcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChainsnachtingipcPageRoutingModule {}
