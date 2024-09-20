import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestablecerconPageRoutingModule } from './restablecercon-routing.module';

import { RestablecerconPage } from './restablecercon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestablecerconPageRoutingModule
  ],
  declarations: [RestablecerconPage]
})
export class RestablecerconPageModule {}
