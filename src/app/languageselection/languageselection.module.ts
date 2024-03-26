import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule} from '@angular/forms' 
import { LanguageselectionPageRoutingModule } from './languageselection-routing.module';

import { LanguageselectionPage } from './languageselection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,TranslateModule,
    ReactiveFormsModule,
    LanguageselectionPageRoutingModule
  ],
  declarations: [LanguageselectionPage]
})
export class LanguageselectionPageModule {}
