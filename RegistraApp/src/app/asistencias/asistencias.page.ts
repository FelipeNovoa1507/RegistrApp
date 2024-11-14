import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { AppComponent } from '../app.component';
import { InteractionService } from '../service/interaction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit, OnDestroy {

  userRole: string | null = null;
  authSubscription: Subscription = new Subscription();
  private firstLoad: boolean = true;

  constructor(
    public app: AppComponent,
    private authService: AuthService,
    private interaction: InteractionService
  ) { }

  ngOnInit() {
    console.log('AsistenciasPage: ngOnInit');
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
      this.interaction.closeLoading(); // Cerrar el indicador de carga aquí
    }, error => {
      console.error('Error al obtener el rol del usuario:', error);
      this.interaction.closeLoading(); // Cerrar el indicador de carga en caso de error
    });
  }
}