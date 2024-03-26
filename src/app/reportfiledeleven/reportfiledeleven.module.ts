import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
import { ReactiveFormsModule} from '@angular/forms' 
import { IonicModule } from '@ionic/angular';

import { ReportfiledelevenPageRoutingModule } from './reportfiledeleven-routing.module';

import { ReportfiledelevenPage } from './reportfiledeleven.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ReportfiledelevenPageRoutingModule
  ],
  declarations: [ReportfiledelevenPage]
})
export class ReportfiledelevenPageModule {}
