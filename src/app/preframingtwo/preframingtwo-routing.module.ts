import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreframingtwoPage } from './preframingtwo.page';

const routes: Routes = [
  {
    path: '',
    component: PreframingtwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreframingtwoPageRoutingModule {}
