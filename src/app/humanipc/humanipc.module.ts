import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HumanipcPageRoutingModule } from './humanipc-routing.module';

import { HumanipcPage } from './humanipc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HumanipcPageRoutingModule
  ],
  declarations: [HumanipcPage]
})
export class HumanipcPageModule {}
