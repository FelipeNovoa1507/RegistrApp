import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirestoreService } from '../service/firestore.service';
import { map, Observable, of } from 'rxjs';
import { Asignatura } from '../models/models.component';  
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { AppComponent } from '../app.component';
import { InteractionService } from '../service/interaction.service';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit, OnDestroy {
  asignaturas: Observable<Asignatura[]> = of([]); // Inicializar con un Observable vacío
  asistencias: Observable<any> = of([]);
  asistenciasPorAsignatura: { [key: string]: any[] } = {};
  userRole: string | null = null;
  userSeccion: string | null = null;
  authSubscription: Subscription = new Subscription();
  private firstLoad: boolean = true;

  constructor(
    public app: AppComponent,
    public authService: AuthService,
    private interaction: InteractionService,
    public firestoreService: FirestoreService,
  ) { }

  ngOnInit() {
    console.log('AsistenciasPage: ngOnInit');
    this.authService.presentLoading(); // Mostrar el indicador de carga al iniciar la página
    this.loadAsignaturas();
  }

  ionViewWillEnter() {
    if (this.firstLoad) {
      this.loadUserRole();
      this.firstLoad = false;
    }
  }

  loadAsignaturas() {
    const userIdAlumno = this.authService.userIdAlumnoSubject.getValue();
    if (userIdAlumno && this.userSeccion) {
      this.asignaturas = this.firestoreService.getCollectionQuery('Asignaturas', 'seccion', this.userSeccion);
      this.loadAsistencias(userIdAlumno);
    } else {
      console.error('No se pudo obtener el ID del alumno o la sección del usuario');
    }
  }
  loadAsistencias(userIdAlumno: string) {
    this.firestoreService.getAsistenciasByAlumno(userIdAlumno).pipe(
      map((asistencias: any[]) => asistencias.map(asistencia => ({
        ...asistencia,
        fecha: asistencia.timestamp.toDate().toLocaleDateString()
      })))
    ).subscribe(asistencias => {
      this.asistenciasPorAsignatura = asistencias.reduce((acc, asistencia) => {
        const { idAsignatura } = asistencia;
        if (!acc[idAsignatura]) {
          acc[idAsignatura] = [];
        }
        acc[idAsignatura].push(asistencia);
        return acc;
      }, {});
    });
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
    this.asignaturas = this.firestoreService.getCollection<Asignatura>('Asignaturas');
    
    this.authService.userSeccion.subscribe(seccion => {
      this.userSeccion = seccion;
      console.log('User Seccion:', this.userSeccion);
    });
    this.authService.userRole.subscribe(role => {
      this.userRole = role;
      this.interaction.closeLoading(); // Cerrar el indicador de carga aquí
    }, error => {
      console.error('Error al obtener el rol del usuario:', error);
      this.interaction.closeLoading(); // Cerrar el indicador de carga en caso de error
    });
  }
  getAsistenciasPorAsignatura(idAsignatura: string) {
    return this.asistenciasPorAsignatura[idAsignatura] || [];
  }
}