import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LegalresourcesPageRoutingModule } from './legalresources-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { LegalresourcesPage } from './legalresources.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,TranslateModule,
    LegalresourcesPageRoutingModule
  ],
  declarations: [LegalresourcesPage]
})
export class LegalresourcesPageModule {}
