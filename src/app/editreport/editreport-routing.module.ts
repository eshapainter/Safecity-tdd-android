import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditreportPage } from './editreport.page';

const routes: Routes = [
  {
    path: '',
    component: EditreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditreportPageRoutingModule {}
