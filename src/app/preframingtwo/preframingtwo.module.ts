import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreframingtwoPageRoutingModule } from './preframingtwo-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PreframingtwoPage } from './preframingtwo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,TranslateModule,
    PreframingtwoPageRoutingModule
  ],
  declarations: [PreframingtwoPage]
})
export class PreframingtwoPageModule {}
