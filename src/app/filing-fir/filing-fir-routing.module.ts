import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilingFIRPage } from './filing-fir.page';

const routes: Routes = [
  {
    path: '',
    component: FilingFIRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilingFIRPageRoutingModule {}
