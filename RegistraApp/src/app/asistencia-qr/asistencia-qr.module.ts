import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciaQrPageRoutingModule } from './asistencia-qr-routing.module';

import { AsistenciaQrPage } from './asistencia-qr.page';
import { QrCodeModule } from 'ng-qrcode';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrCodeModule,
    AsistenciaQrPageRoutingModule
  ],
  declarations: [AsistenciaQrPage, BarcodeScanningModalComponent]
})
export class AsistenciaQrPageModule {}
