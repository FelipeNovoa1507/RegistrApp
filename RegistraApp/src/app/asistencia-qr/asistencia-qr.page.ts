import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { Clipboard } from '@capacitor/clipboard';
import { Browser } from '@capacitor/browser';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-asistencia-qr',
  templateUrl: './asistencia-qr.page.html',
  styleUrls: ['./asistencia-qr.page.scss'],
})
export class AsistenciaQrPage implements OnInit {

  segment: string = 'generar';
  qrText = 'oe chucky cualquier wa vo tay acreditaooo por la fixaaaaaaa';

  //www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley
  scanResult = 'www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley';
  userRole: string | null = null;
  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private toastController: ToastController,
    private authService: AuthService

  ) {}

  async startScanner() {
    const modal = await this.modalController.create({
    component: BarcodeScanningModalComponent,
    cssClass: 'barcode-scanning-modal',
    showBackdrop: false,
    componentProps: { 
      formats: [],
      LensFacing: LensFacing.Back 
     }
    });
  
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.scanResult = data?.barcode?.displayValue;
    }
  
  }


  ngOnInit() : void{
    if(this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
    this.authService.user$.subscribe(user => {
      if (user) {
        this.userRole = user.role;
        this.segment = this.userRole === 'profe' ? 'generar' : 'escanear';
      } else {
        this.userRole = null;
      }
    });
  }

  segmentChanged(event: any) {
    this.segment = event.detail.value;
  }

  isUrl(){
    let regex = /\.(com|net|io|me|crypto|ai)\b/i;
    return regex.test(this.scanResult);
  }


  writeToClipboard = async () => {
    await Clipboard.write({
      string: this.scanResult 
    });
    
    
    const toast = await this.toastController.create({
      message: 'Copiado al portapapeles.',
      duration: 1000,
      icon: 'clipboard',
      position: 'middle'
  
    });
    toast.present();
  };


openCapacitorSite = async () => {
  await Browser.open({ url: 'https://' + this.scanResult });
};





}


