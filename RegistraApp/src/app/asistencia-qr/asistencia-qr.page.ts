import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { Clipboard } from '@capacitor/clipboard';
import { Browser } from '@capacitor/browser';
import { AuthService } from '../service/auth.service';
import { Subscription } from 'rxjs';
import { InteractionService } from '../service/interaction.service';
import { AjustesComponent } from '../backend/ajustes/ajustes.component';
import { FirestoreService } from '../service/firestore.service';
import { Usuario } from '../models/models.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-asistencia-qr',
  templateUrl: './asistencia-qr.page.html',
  styleUrls: ['./asistencia-qr.page.scss'],
  providers: [AjustesComponent]
})
export class AsistenciaQrPage implements OnInit, OnDestroy {
  idProfe: string | null = null;
  userRole: string | null = null;
  authSubscription: Subscription = new Subscription();
  segment: string = '';
  role: boolean = false;
  qrText = '';
  userData: any;
  scanResult = '';
  asignaturas: any[] = []; // Variable para almacenar las asignaturas
  selectedAsignatura: string | null = null; // Variable para almacenar la asignatura seleccionada
  asistenciaData: any; // Declarar la variable de clase para almacenar asistenciaData
  private firstLoad: boolean = true;

  constructor(
    public app: AppComponent,
    private platform: Platform,
    private modalController: ModalController,
    private toastController: ToastController,
    private authService: AuthService, 
    private interaction: InteractionService,
    public ajustesComponent: AjustesComponent,
    public firestore: FirestoreService
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
      this.userData = data?.userData;
      this.asistenciaData = data?.asistenciaData; // Recibir asistenciaData del modal
    }
  }

  ngOnInit(): void {
    console.log('AsistenciaQrPage: ngOnInit');
    this.authService.presentLoading(); // Mostrar el indicador de carga al iniciar la página
  }

  ionViewWillEnter() {
    if (this.firstLoad) {
      this.loadUserRole();
      this.firstLoad = false;
    }
  }

  ionViewWillLeave() {
    this.interaction.closeLoading();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.authService.closeLoading(); // Asegurarse de cerrar el indicador de carga al destruir el componente
  }

  loadUserRole() {
    this.authService.getUserRole();
    
    this.authService.userRole.subscribe(role => {
      this.userRole = role;
      this.setSegmentBasedOnRole();
      if (this.userRole === 'Profesor') {
        this.setQrTextWithUserData();
      }
    });

    this.authService.userIdProfesor.subscribe(idProfesor => {
      if (idProfesor) {
        this.idProfe = idProfesor;
        this.buscarAsignatura(); // Llama a buscarAsignatura después de asignar el ID
      }
    });

    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
  }

  buscarAsignatura() {
    const idProfe = this.idProfe || '';
    this.firestore.getCollectionQuery<Usuario>('Asignaturas', 'idProfesor', idProfe).subscribe(res => {
      this.asignaturas = res;
    });
  }

  onAsignaturaChange(event: any) {
    const idAsignatura = event.detail.value;
    this.selectedAsignatura = idAsignatura;
    this.setQrTextWithUserData();
  }

  setQrTextWithUserData() {
    // Suscribirse a los datos del usuario para obtener la información del profesor
    this.authService.userIdProfesor.subscribe(idProfesor => {
      if (idProfesor && this.selectedAsignatura) {
        const qrData = {
          idProfesor: idProfesor,
          idAsignatura: this.selectedAsignatura
        };
        this.qrText = JSON.stringify(qrData);
      }
    });
  }

  setSegmentBasedOnRole() {
    if (this.userRole === 'Profesor') {
      this.segment = 'generar';
    } else {
      this.segment = 'escanear';
    }
  }

  segmentChanged(event: any) {
    this.segment = event.detail.value;
  }

  isUrl() {
    let regex = /\.(com|net|io|me|crypto|ai)\b/i;
    return regex.test(this.scanResult);
  }

  writeToClipboard = async () => {
    await Clipboard.write({
      string: this.asistenciaData 
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