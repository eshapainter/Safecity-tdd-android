import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewdataPage } from './viewdata.page';

const routes: Routes = [
  {
    path: '',
    component: ViewdataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewdataPageRoutingModule {}
