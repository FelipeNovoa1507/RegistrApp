import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciaQrPage } from './asistencia-qr.page';

describe('AsistenciaQrPage', () => {
  let component: AsistenciaQrPage;
  let fixture: ComponentFixture<AsistenciaQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
