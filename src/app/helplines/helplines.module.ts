import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelplinesPageRoutingModule } from './helplines-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { HelplinesPage } from './helplines.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,TranslateModule,
    HelplinesPageRoutingModule
  ],
  declarations: [HelplinesPage]
})
export class HelplinesPageModule {}
