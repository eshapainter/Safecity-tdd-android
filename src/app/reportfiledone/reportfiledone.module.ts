import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReportfiledonePageRoutingModule } from './reportfiledone-routing.module';
import { ReportfiledonePage } from './reportfiledone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportfiledonePageRoutingModule
  ],
  declarations: [ReportfiledonePage]
})
export class ReportfiledonePageModule {}
