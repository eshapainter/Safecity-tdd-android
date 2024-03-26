import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyreportPage } from './myreport.page';

const routes: Routes = [
  {
    path: '',
    component: MyreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyreportPageRoutingModule {}
