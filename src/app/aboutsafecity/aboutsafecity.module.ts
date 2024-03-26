import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutsafecityPageRoutingModule } from './aboutsafecity-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { AboutsafecityPage } from './aboutsafecity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,TranslateModule,
    AboutsafecityPageRoutingModule
  ],
  declarations: [AboutsafecityPage]
})
export class AboutsafecityPageModule {}
