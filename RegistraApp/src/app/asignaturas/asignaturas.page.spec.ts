import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AsignaturasPage } from './asignaturas.page';
import { AuthService } from '../service/auth.service';
import { FirestoreService } from '../service/firestore.service';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

describe('AsignaturasPage', () => {
  let component: AsignaturasPage;
  let fixture: ComponentFixture<AsignaturasPage>;

  const mockAuthService = {
    presentLoading: jasmine.createSpy('presentLoading'),
    closeLoading: jasmine.createSpy('closeLoading'),
    getUserRole: jasmine.createSpy('getUserRole').and.returnValue(of('Profesor')),
    userRole: of('Profesor'),
    userSeccion: of('101'),
    userIdProfesor: of('1234'),
  };

  const mockFirestoreService = {
    getCollection: jasmine.createSpy('getCollection').and.returnValue(of([])),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignaturasPage],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig), // Configura Firebase
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: FirestoreService, useValue: mockFirestoreService },
        AngularFireAuth, // Asegura que esté disponible en el test
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ignora elementos personalizados como ion-header
    }).compileComponents();

    fixture = TestBed.createComponent(AsignaturasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('Deberia llamaer presentLoading on init', () => {
      expect(mockAuthService.presentLoading).toHaveBeenCalled();
    });

  it('setear el UserRole Correcto', () => {
    component.loadUserRole();
    expect(component.userRole).toBe('Profesor');
  });
});