import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewsafteydetailPageRoutingModule } from './viewsafteydetail-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ViewsafteydetailPage } from './viewsafteydetail.page';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ViewsafteydetailPageRoutingModule
  ],
  declarations: [ViewsafteydetailPage]
})
export class ViewsafteydetailPageModule {}
