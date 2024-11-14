import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
  LensFacing,
  StartScanOptions,
} from '@capacitor-mlkit/barcode-scanning';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../service/auth.service'; // Importa el servicio de autenticación
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { InteractionService } from '../service/interaction.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-barcode-scanning',
  template: `
    <ion-header>
      <ion-toolbar style="color: var(--ion-color-duocblue);">
        <ion-title style="color: white;">Escanear Código Qr</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">
            <ion-icon name="close" style="color: white;"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div #square class="square"></div>
      <ion-fab
        *ngIf="isTorchAvailable"
        slot="fixed"
        horizontal="end"
        vertical="bottom"
      >
        <ion-fab-button (click)="toggleTorch()">
          <ion-icon name="flashlight"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      
    </ion-content>
  `,
  styles: [
    `
      ion-content {
        --background: transparent;
      }

      .square {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 16px;
        width: 200px;
        height: 200px;
        border: 6px solid white;
        box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.3);
      }
    `,
  ],
})
export class BarcodeScanningModalComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  public formats: BarcodeFormat[] = [];
  @Input()
  public lensFacing: LensFacing = LensFacing.Back;

  @ViewChild('square')
  public squareElement: ElementRef<HTMLDivElement> | undefined;

  public isTorchAvailable = false;
  public userData: any;
  asistenciaData: any;
  private userSubscription: Subscription | undefined;

  constructor(
    private readonly ngZone: NgZone,
    private modalController: ModalController,
    private authService: AuthService,// Inyecta el servicio de autenticación
    private firestore: AngularFirestore, // Inyecta el servicio de Firestore
    private interaction: InteractionService,
    private router: Router

  ) {}

  dismiss() {
    this.modalController.dismiss();
  }

  public ngOnInit(): void {
    BarcodeScanner.isTorchAvailable().then((result) => {
      this.isTorchAvailable = result.available;
    });
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.startScan();
    }, 250);
  }

  public ngOnDestroy(): void {
    this.stopScan();
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  public asistencia = {};
  public datosAsistencia(){

  }

  public async closeModal(barcode?: Barcode): Promise<void> {
    this.interaction.presentLoading('Registrando asistencia');
    if (barcode) {
      try {
        const qrData = JSON.parse(barcode.displayValue);
        const { idProfesor, idAsignatura } = qrData;

        // Obtener datos del usuario
        this.authService.getUserRole();
        this.authService.userRole.pipe(take(1)).subscribe((role) => {
          this.userData = {
            seccion: this.authService.userSeccionSubject.getValue(),
            idAlumno: this.authService.userIdAlumnoSubject.getValue(),
          };

          // Guardar los datos en Firestore
          this.asistenciaData = {
            idProfesor,
            idAsignatura,
            idAlumno: this.userData.idAlumno,
            seccion: this.userData.seccion,
            timestamp: new Date()
          };

          this.firestore.collection('AsistenciaAlumno').doc(this.firestore.createId()).set(this.asistenciaData).then(() => {
            this.interaction.closeLoading();
            this.interaction.presentToast('Asistencia registrada con éxito');
            this.modalController.dismiss({
              barcode,
              userData: this.userData,
              asistenciaData: this.asistenciaData // Pasar asistenciaData al cerrar el modal
            });
          }).catch((error) => {
            console.error('Error al crear el documento:', error);
            this.interaction.closeLoading();
            this.interaction.presentToast('Error al registrar la asistencia');
          });
        });
      } catch (error) {
        console.error('Error al procesar el QR:', error);
        this.interaction.presentToast('Error al procesar el QR');
        this.modalController.dismiss();
      }
    } else {
      this.modalController.dismiss();
    }
  }

  public async toggleTorch(): Promise<void> {
    await BarcodeScanner.toggleTorch();
  }

  private async startScan(): Promise<void> {
    // Hide everything behind the modal (see `src/theme/variables.scss`)
    document.querySelector('body')?.classList.add('barcode-scanning-active');

    const options: StartScanOptions = {
      formats: this.formats,
      lensFacing: this.lensFacing,
    };

    const squareElementBoundingClientRect =
      this.squareElement?.nativeElement.getBoundingClientRect();
    const scaledRect = squareElementBoundingClientRect
      ? {
          left: squareElementBoundingClientRect.left * window.devicePixelRatio,
          right:
            squareElementBoundingClientRect.right * window.devicePixelRatio,
          top: squareElementBoundingClientRect.top * window.devicePixelRatio,
          bottom:
            squareElementBoundingClientRect.bottom * window.devicePixelRatio,
          width:
            squareElementBoundingClientRect.width * window.devicePixelRatio,
          height:
            squareElementBoundingClientRect.height * window.devicePixelRatio,
        }
      : undefined;
    const detectionCornerPoints = scaledRect
      ? [
          [scaledRect.left, scaledRect.top],
          [scaledRect.left + scaledRect.width, scaledRect.top],
          [
            scaledRect.left + scaledRect.width,
            scaledRect.top + scaledRect.height,
          ],
          [scaledRect.left, scaledRect.top + scaledRect.height],
        ]
      : undefined;
    const listener = await BarcodeScanner.addListener(
      'barcodeScanned',
      async (event) => {
        this.ngZone.run(() => {
          const cornerPoints = event.barcode.cornerPoints;
          if (detectionCornerPoints && cornerPoints) {
            if (
              detectionCornerPoints[0][0] > cornerPoints[0][0] ||
              detectionCornerPoints[0][1] > cornerPoints[0][1] ||
              detectionCornerPoints[1][0] < cornerPoints[1][0] ||
              detectionCornerPoints[1][1] > cornerPoints[1][1] ||
              detectionCornerPoints[2][0] < cornerPoints[2][0] ||
              detectionCornerPoints[2][1] < cornerPoints[2][1] ||
              detectionCornerPoints[3][0] > cornerPoints[3][0] ||
              detectionCornerPoints[3][1] < cornerPoints[3][1]
            ) {
              return;
            }
          }
          listener.remove();
          this.closeModal(event.barcode);
        });
      }
    );
    await BarcodeScanner.startScan(options);
  }

  private async stopScan(): Promise<void> {
    // Show everything behind the modal again
    document.querySelector('body')?.classList.remove('barcode-scanning-active');

    await BarcodeScanner.stopScan();
  }
}