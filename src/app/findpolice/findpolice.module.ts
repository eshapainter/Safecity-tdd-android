import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FindpolicePageRoutingModule } from './findpolice-routing.module';

import { FindpolicePage } from './findpolice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,TranslateModule,
    IonicModule,
    FindpolicePageRoutingModule
  ],
  declarations: [FindpolicePage]
})
export class FindpolicePageModule {}
