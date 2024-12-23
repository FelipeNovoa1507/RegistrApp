import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { AjustesComponent } from './ajustes.component';

describe('AjustesComponent', () => {
  let component: AjustesComponent;
  let fixture: ComponentFixture<AjustesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AjustesComponent ],
      imports: [IonicModule.forRoot()],
      providers: [AppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AjustesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
