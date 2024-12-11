import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AjustesComponent } from '../backend/ajustes/ajustes.component';
import { AppComponent } from '../app.component';
import { RegistroPage } from './registro.page';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../../environments/environment';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [
        ReactiveFormsModule,
        FormsModule, // Añadir aquí
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule
      ],
      providers: [
        { provide: Router, useValue: {} },
        { provide: MenuController, useValue: {} },
        { provide: NavController, useValue: { navigateForward: () => {} } },
        AppComponent,
        AjustesComponent
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe validar correctamente el RUT', () => {
    const control = component.registroForm.controls['rut'];
    control.setValue('12345678-5');
    expect(component.validarRut(control)).toBeNull(); // RUT válido

    control.setValue('12345678-9');
    expect(component.validarRut(control)).toEqual({ rutInvalido: true }); // RUT inválido
  });
  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });


  it('Debe validar que las contraseñas coincidan', () => {
    const form = component.registroForm;
    form.controls['password'].setValue('password123');
    form.controls['confirmPassword'].setValue('password123');
    expect(component.passwordMatchValidator(form)).toBeNull(); // Contraseñas coinciden

    form.controls['confirmPassword'].setValue('password456');
    expect(component.passwordMatchValidator(form)).toEqual({ mismatch: true }); // Contraseñas no coinciden
  });

  it('Debe alternar la visibilidad de la contraseña', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#togglePasswordVisibilityButton');
    
    button.click();
    fixture.detectChanges();
    expect(component.passwordType).toBe('text');
    expect(component.passwordIcon).toBe('eye');

    button.click();
    fixture.detectChanges();
    expect(component.passwordType).toBe('password');
    expect(component.passwordIcon).toBe('eye-off');
  });
});