import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciasPage } from './asistencias.page';
import { AuthService } from '../service/auth.service';
import { InteractionService } from '../service/interaction.service';
import { FirestoreService } from '../service/firestore.service';
import { of } from 'rxjs';
import { AppComponent } from '../app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FilterByIdProfePipe } from '../pipes/filter-by-idProfe.pipe';
import { FilterBySeccionPipe } from '../pipes/filter-by-seccion.pipe';
import { IonicModule } from '@ionic/angular';

// Mock Services
const mockAuthService = {
  presentLoading: jasmine.createSpy('presentLoading'),
  closeLoading: jasmine.createSpy('closeLoading'),
  userIdAlumnoSubject: { getValue: () => 'testUserId' },
  userSeccion: of('A'),
  userRole: of('student'),
  getUserRole: jasmine.createSpy('getUserRole'),
};

const mockInteractionService = {
  closeLoading: jasmine.createSpy('closeLoading'),
};

const mockFirestoreService = {
  getCollectionQuery: jasmine.createSpy('getCollectionQuery').and.returnValue(of([
    { id: '1', nombre: 'Matemáticas', codigo: '018', seccion: 'A' },
    { id: '2', nombre: 'Historia', codigo: '019', seccion: 'A' },
  ])),
  getAsistenciasByAlumno: jasmine.createSpy('getAsistenciasByAlumno').and.returnValue(of([
    { idAsignatura: '1', timestamp: { toDate: () => new Date('2024-11-28') } },
    { idAsignatura: '2', timestamp: { toDate: () => new Date('2024-11-29') } },
  ])),
};

describe('AsistenciasPage', () => {
  let component: AsistenciasPage;
  let fixture: ComponentFixture<AsistenciasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsistenciasPage, FilterByIdProfePipe, FilterBySeccionPipe
      ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: InteractionService, useValue: mockInteractionService },
        { provide: FirestoreService, useValue: mockFirestoreService },
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AsistenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cargar las asignaturas al inicializar', () => {
    spyOn(component, 'loadAsignaturas');
    component.ngOnInit();
    expect(component.loadAsignaturas).toHaveBeenCalled();
  });

  it('Debe cargar el rol del usuario y las asignaturas al entrar en la vista', () => {
    spyOn(component, 'loadUserRole');
    component.ionViewWillEnter();
    expect(component.loadUserRole).toHaveBeenCalled();
  }); 

  



  it('Debe limpiar los recursos al destruir el componente', () => {
    spyOn(component.authSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.authSubscription.unsubscribe).toHaveBeenCalled();
    expect(mockAuthService.closeLoading).toHaveBeenCalled();
  });
});