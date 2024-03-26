import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VolunteerPageRoutingModule } from './volunteer-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { VolunteerPage } from './volunteer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,TranslateModule,
    VolunteerPageRoutingModule
  ],
  declarations: [VolunteerPage]
})
export class VolunteerPageModule {}
