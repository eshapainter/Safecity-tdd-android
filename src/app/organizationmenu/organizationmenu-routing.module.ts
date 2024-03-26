import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationmenuPage } from './organizationmenu.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationmenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationmenuPageRoutingModule {}
