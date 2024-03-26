import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountrymenupopoverPageRoutingModule } from './countrymenupopover-routing.module';

import { CountrymenupopoverPage } from './countrymenupopover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountrymenupopoverPageRoutingModule
  ],
  declarations: [CountrymenupopoverPage]
})
export class CountrymenupopoverPageModule {}
