import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanguagemenuPage } from './languagemenu.page';

const routes: Routes = [
  {
    path: '',
    component: LanguagemenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LanguagemenuPageRoutingModule {}
