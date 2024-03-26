import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LegalresourcesPage } from './legalresources.page';

const routes: Routes = [
  {
    path: '',
    component: LegalresourcesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalresourcesPageRoutingModule {}
