import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewsafetyPageRoutingModule } from './viewsafety-routing.module';

import { ViewsafetyPage } from './viewsafety.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewsafetyPageRoutingModule
  ],
  declarations: [ViewsafetyPage]
})
export class ViewsafetyPageModule {}
