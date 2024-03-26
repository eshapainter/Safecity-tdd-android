import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentingipcPage } from './commentingipc.page';

const routes: Routes = [
  {
    path: '',
    component: CommentingipcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentingipcPageRoutingModule {}
