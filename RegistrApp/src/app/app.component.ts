import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Perfil de Usuario', url: '/perfil', icon: 'person-circle' },
    { title: 'Historial de Asistencias', url: '/historial', icon: 'newspaper' },
    { title: 'Ayuda/Soporte', url: '/ayuda', icon: 'information-circle' },
  
  ];
  constructor() {}
}
