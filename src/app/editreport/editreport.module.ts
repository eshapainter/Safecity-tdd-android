import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditreportPageRoutingModule } from './editreport-routing.module';
import { EditreportPage } from './editreport.page';
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    EditreportPageRoutingModule
  ],
  declarations: [EditreportPage]
})
export class EditreportPageModule {}
