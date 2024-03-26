import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SevensubfieldthreePageRoutingModule } from './sevensubfieldthree-routing.module';

import { SevensubfieldthreePage } from './sevensubfieldthree.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SevensubfieldthreePageRoutingModule
  ],
  declarations: [SevensubfieldthreePage]
})
export class SevensubfieldthreePageModule {}
