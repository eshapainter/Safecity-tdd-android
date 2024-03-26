import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomesticviolencePage } from './domesticviolence.page';

const routes: Routes = [
  {
    path: '',
    component: DomesticviolencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomesticviolencePageRoutingModule {}
