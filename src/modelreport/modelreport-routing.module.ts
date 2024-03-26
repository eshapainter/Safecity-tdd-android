import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModelreportPage } from './modelreport.page';

const routes: Routes = [
  {
    path: '',
    component: ModelreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModelreportPageRoutingModule {}
