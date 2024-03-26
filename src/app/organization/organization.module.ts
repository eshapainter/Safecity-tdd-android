import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizationPageRoutingModule } from './organization-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { OrganizationPage } from './organization.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    OrganizationPageRoutingModule
  ],
  declarations: [OrganizationPage]
})
export class OrganizationPageModule {}
