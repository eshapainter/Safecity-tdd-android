import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SevensubfieldonePage } from './sevensubfieldone.page';

const routes: Routes = [
  {
    path: '',
    component: SevensubfieldonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SevensubfieldonePageRoutingModule {}
