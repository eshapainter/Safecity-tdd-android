import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SafteytiptwoPageRoutingModule } from './safteytiptwo-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SafteytiptwoPage } from './safteytiptwo.page';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SafteytiptwoPageRoutingModule
  ],
  declarations: [SafteytiptwoPage]
})
export class SafteytiptwoPageModule {}
