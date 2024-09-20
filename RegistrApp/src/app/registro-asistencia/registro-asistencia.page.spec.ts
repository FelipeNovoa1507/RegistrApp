import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroAsistenciaPage } from './registro-asistencia.page';

describe('RegistroAsistenciaPage', () => {
  let component: RegistroAsistenciaPage;
  let fixture: ComponentFixture<RegistroAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
