import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestablecerconPage } from './restablecercon.page';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../../environments/environment';
import { AppComponent } from '../app.component';
import { AjustesComponent } from '../backend/ajustes/ajustes.component';


describe('RestablecerconPage', () => {
  let component: RestablecerconPage;
  let fixture: ComponentFixture<RestablecerconPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestablecerconPage],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
      ],
      providers: [
        { provide: Router, useValue: {} },
        { provide: NavController, useValue: { navigateForward: () => {} } },
        AjustesComponent,
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RestablecerconPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });
});