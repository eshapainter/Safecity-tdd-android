import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SevensubfieldtwoPageRoutingModule } from './sevensubfieldtwo-routing.module';

import { SevensubfieldtwoPage } from './sevensubfieldtwo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SevensubfieldtwoPageRoutingModule
  ],
  declarations: [SevensubfieldtwoPage]
})
export class SevensubfieldtwoPageModule {}
