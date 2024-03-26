import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountrymenupopoverPage } from './countrymenupopover.page';

const routes: Routes = [
  {
    path: '',
    component: CountrymenupopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountrymenupopoverPageRoutingModule {}
