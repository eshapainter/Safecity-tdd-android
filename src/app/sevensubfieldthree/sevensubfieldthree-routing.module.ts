import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SevensubfieldthreePage } from './sevensubfieldthree.page';

const routes: Routes = [
  {
    path: '',
    component: SevensubfieldthreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SevensubfieldthreePageRoutingModule {}
