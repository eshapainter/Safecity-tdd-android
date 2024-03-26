import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilingFIRPageRoutingModule } from './filing-fir-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FilingFIRPage } from './filing-fir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,TranslateModule,
    IonicModule,
    FilingFIRPageRoutingModule
  ],
  declarations: [FilingFIRPage]
})
export class FilingFIRPageModule {}
