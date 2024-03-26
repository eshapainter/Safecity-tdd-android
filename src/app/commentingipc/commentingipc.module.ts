import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentingipcPageRoutingModule } from './commentingipc-routing.module';

import { CommentingipcPage } from './commentingipc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentingipcPageRoutingModule
  ],
  declarations: [CommentingipcPage]
})
export class CommentingipcPageModule {}
