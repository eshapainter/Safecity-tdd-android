import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LanguagemenuPageRoutingModule } from './languagemenu-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { LanguagemenuPage } from './languagemenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,TranslateModule,
    LanguagemenuPageRoutingModule
  ],
  declarations: [LanguagemenuPage]
})
export class LanguagemenuPageModule {}
