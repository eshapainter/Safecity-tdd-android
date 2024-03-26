import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountrymenuPage } from './countrymenu.page';

const routes: Routes = [
  {
    path: '',
    component: CountrymenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountrymenuPageRoutingModule {}
