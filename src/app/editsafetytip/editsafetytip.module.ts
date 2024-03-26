import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EditsafetytipPageRoutingModule } from './editsafetytip-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { EditsafetytipPage } from './editsafetytip.page';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditsafetytipPageRoutingModule
  ],
  declarations: [EditsafetytipPage]
})
export class EditsafetytipPageModule {}
