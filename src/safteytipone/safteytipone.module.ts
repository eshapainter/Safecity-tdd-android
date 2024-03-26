import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SafteytiponePageRoutingModule } from './safteytipone-routing.module';

import { SafteytiponePage } from './safteytipone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,ReactiveFormsModule,
    SafteytiponePageRoutingModule
  ],
  declarations: [SafteytiponePage]
})
export class SafteytiponePageModule {}
