import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreframingsecondaryPageRoutingModule } from './preframingsecondary-routing.module';

import { PreframingsecondaryPage } from './preframingsecondary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreframingsecondaryPageRoutingModule
  ],
  declarations: [PreframingsecondaryPage]
})
export class PreframingsecondaryPageModule {}
