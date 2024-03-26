import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindhospitalPage } from './findhospital.page';

const routes: Routes = [
  {
    path: '',
    component: FindhospitalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindhospitalPageRoutingModule {}
