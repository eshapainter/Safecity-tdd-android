import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MysafetyreportPage } from './mysafetyreport.page';

const routes: Routes = [
  {
    path: '',
    component: MysafetyreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MysafetyreportPageRoutingModule {}
