import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IpcPageRoutingModule } from './ipc-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { IpcPage } from './ipc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,TranslateModule,
    IpcPageRoutingModule
  ],
  declarations: [IpcPage]
})
export class IpcPageModule {}
