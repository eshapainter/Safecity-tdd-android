import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewsafetyPage } from './viewsafety.page';

const routes: Routes = [
  {
    path: '',
    component: ViewsafetyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsafetyPageRoutingModule {}
