import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciaQrPageRoutingModule } from './asistencia-qr-routing.module';

import { AsistenciaQrPage } from './asistencia-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaQrPageRoutingModule
  ],
  declarations: [AsistenciaQrPage]
})
export class AsistenciaQrPageModule {}
