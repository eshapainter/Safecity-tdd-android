import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CountrymenuPageRoutingModule } from './countrymenu-routing.module';

import { CountrymenuPage } from './countrymenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,TranslateModule,
    IonicModule,ReactiveFormsModule,
    CountrymenuPageRoutingModule
  ],
  declarations: [CountrymenuPage]
})
export class CountrymenuPageModule {}
