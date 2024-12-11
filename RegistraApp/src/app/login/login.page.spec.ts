import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { AuthService } from '../service/auth.service';
import { InteractionService } from '../service/interaction.service';
import { MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authServiceMock: any;
  let interactionServiceMock: any;
  let menuCtrlMock: any;


  beforeEach(() => {
    authServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(Promise.resolve(true)),
    };
    interactionServiceMock = {
      presentLoading: jasmine.createSpy('presentLoading'),
      closeLoading: jasmine.createSpy('closeLoading'),
    };
    menuCtrlMock = {
      enable: jasmine.createSpy('enable'),
    };
  

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: InteractionService, useValue: interactionServiceMock },
        { provide: MenuController, useValue: {} },
        { provide: AlertController, useValue: {} },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe alternar la visibilidad de la contraseña', () => {
    component.passwordType = 'password';
    component.passwordIcon = 'eye-off';

    component.togglePasswordVisibility();
    expect(component.passwordType).toBe('text');
    expect(component.passwordIcon).toBe('eye');

    component.togglePasswordVisibility();
    expect(component.passwordType).toBe('password');
    expect(component.passwordIcon).toBe('eye-off');
  });



  it('Debe cargar las credenciales almacenadas', () => {
    spyOn(localStorage, 'getItem').and.callFake((key) => {
      if (key === 'correo') return 'test@example.com';
      if (key === 'password') return '123456';
      return null;
    });
  
    component.loadCredentials();
    expect(component.credenciales.correo).toBe('test@example.com');
    expect(component.credenciales.password).toBe('123456');
    expect(component.rememberMe).toBeTrue();
  });
});