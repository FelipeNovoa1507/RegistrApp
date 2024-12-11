import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirestoreService } from '../service/firestore.service';
import { Observable, of } from 'rxjs';
import { Asignatura } from '../models/models.component';
import { Subscription } from 'rxjs';
import { Usuario } from '../models/models.component';
import { AuthService } from '../service/auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
  providers: [AppComponent]
})
export class AsignaturasPage implements OnInit, OnDestroy {
  segment: string = '';
  asignaturas: Observable<Asignatura[]> = of([]); // Inicializar con un Observable vacío
  userSeccion: string | null = null;
  userIdProfe: string | null = null;
  userRole: string | null = null;
  authSubscription: Subscription = new Subscription();
  usuarios: Usuario[] = [];
  private firstLoad: boolean = true;

  constructor(
    public app: AppComponent,
    private firestoreService: FirestoreService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    console.log('AsignaturasPage: ngOnInit');
    this.authService.presentLoading(); // Mostrar el indicador de carga al iniciar la página
  }

  ionViewWillEnter() {
    if (this.firstLoad) {
      this.loadUserRole();
      this.firstLoad = false;
    }
  }

  ionViewDidEnter() {
    this.authService.closeLoading(); // Cerrar el indicador de carga cuando la vista haya entrado completamente
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
    });

    this.asignaturas = this.firestoreService.getCollection<Asignatura>('Asignaturas');
    
    this.authService.userSeccion.subscribe(seccion => {
      this.userSeccion = seccion;
      console.log('User Seccion:', this.userSeccion);
    });

    this.authService.userIdProfesor.subscribe(idProfesor => {
      this.userIdProfe = idProfesor;
      console.log('User Seccion:', this.userIdProfe);
    });
  }

  setSegmentBasedOnRole() {
    if (this.userRole === 'Profesor') {
      this.segment = 'generar';
    } else {
      this.segment = 'escanear';
    }
  }
}