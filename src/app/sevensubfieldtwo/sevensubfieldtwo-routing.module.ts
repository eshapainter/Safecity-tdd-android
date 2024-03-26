import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SevensubfieldtwoPage } from './sevensubfieldtwo.page';

const routes: Routes = [
  {
    path: '',
    component: SevensubfieldtwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SevensubfieldtwoPageRoutingModule {}
