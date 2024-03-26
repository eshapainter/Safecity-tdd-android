import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SafetyfilterPageRoutingModule } from './safetyfilter-routing.module';

import { SafetyfilterPage } from './safetyfilter.page';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SafetyfilterPageRoutingModule
  ],
  declarations: [SafetyfilterPage]
})
export class SafetyfilterPageModule {}
