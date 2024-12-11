import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AyudaPage } from './ayuda.page';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AjustesComponent } from '../backend/ajustes/ajustes.component';
import { AppComponent } from '../app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../../environments/environment';


describe('AyudaPage', () => {
  let component: AyudaPage;
  let fixture: ComponentFixture<AyudaPage>;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [AyudaPage],
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
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AyudaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
