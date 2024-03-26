import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CountryPageRoutingModule } from './country-routing.module';
import { CountryPage } from './country.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CountryPageRoutingModule
  ],
  declarations: [CountryPage]
})
export class CountryPageModule {}
