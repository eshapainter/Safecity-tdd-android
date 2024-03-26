import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewdataPageRoutingModule } from './viewdata-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { ViewdataPage } from './viewdata.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ViewdataPageRoutingModule
  ],
  declarations: [ViewdataPage]
})
export class ViewdataPageModule {}
