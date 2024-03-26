import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreframingsecondaryPage } from './preframingsecondary.page';

const routes: Routes = [
  {
    path: '',
    component: PreframingsecondaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreframingsecondaryPageRoutingModule {}
