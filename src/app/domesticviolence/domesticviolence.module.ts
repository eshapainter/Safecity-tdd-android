import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomesticviolencePageRoutingModule } from './domesticviolence-routing.module';

import { DomesticviolencePage } from './domesticviolence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DomesticviolencePageRoutingModule
  ],
  declarations: [DomesticviolencePage]
})
export class DomesticviolencePageModule {}
