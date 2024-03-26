import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanguageselectionPage } from './languageselection.page';

const routes: Routes = [
  {
    path: '',
    component: LanguageselectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LanguageselectionPageRoutingModule {}
