import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

interface MenuItem {
  title: string;
  url?: string;
  icon: string;
  expanded?: boolean;
  children?: MenuItem[];
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: MenuItem[] = [
    {
      title: 'Usuario',
      icon: 'accessibility',
      expanded: false,
      children: [
        { title: 'Perfil de Usuario', url: '/perfil', icon: 'person-circle' },
        { title: 'Asignatura', url: '/asignaturas', icon: 'book' },
        { title: 'Asistencia', url: '/asistencias', icon: 'calendar' },
        { title: 'Modificar Contraseña', url: '/restablecercon', icon: 'create' }
      ]
    },
    { title: 'Registro Asistencia', url: '/asistencia-qr', icon: 'calendar-clear' },
    { title: 'Ayuda/Soporte', url: '/ayuda', icon: 'information-circle' },
    { title: 'Cerrar Sesión', url: '/login', icon: 'log-out' }
  ];

  constructor(private menu: MenuController) {}

  toggleMenu(page: MenuItem) {
    page.expanded = !page.expanded;
  }

  closeMenu() {
    this.menu.close();
  }

  closeSubMenu(page: MenuItem) {
    page.expanded = false;
    this.closeMenu();
  }
}