import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SevensubfieldonePageRoutingModule } from './sevensubfieldone-routing.module';

import { SevensubfieldonePage } from './sevensubfieldone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SevensubfieldonePageRoutingModule
  ],
  declarations: [SevensubfieldonePage]
})
export class SevensubfieldonePageModule {}
