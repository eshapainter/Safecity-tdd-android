import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizationmenuPageRoutingModule } from './organizationmenu-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { OrganizationmenuPage } from './organizationmenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,TranslateModule,
    OrganizationmenuPageRoutingModule
  ],
  declarations: [OrganizationmenuPage]
})
export class OrganizationmenuPageModule {}
