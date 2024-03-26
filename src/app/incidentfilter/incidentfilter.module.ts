import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { IncidentfilterPageRoutingModule } from './incidentfilter-routing.module';

import { IncidentfilterPage } from './incidentfilter.page';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentfilterPageRoutingModule
  ],
  declarations: [IncidentfilterPage]
})
export class IncidentfilterPageModule {}
