import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

interface MenuItem {
  title: string;
  url?: string;
  icon: string;
  expanded?: boolean;
  children?: MenuItem[];
  action?: () => void;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
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
    { title: 'Cerrar Sesión', icon: 'log-out', action:  () => this.logout() }
  ];

  userRole: string | null = null;

  constructor(
    private menu: MenuController, 
    private platform: Platform,
    public router: Router,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      ScreenOrientation.lock({ orientation: 'portrait' });
    });
  }

  ngOnInit(){
    console.log('ngOnInit');
  }



  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  toggleMenu(page: MenuItem) {
    page.expanded = !page.expanded;
  }

  handlePageAction(page: MenuItem) {
    if (page.action) {
      page.action();
    } else if (page.url) {
      this.router.navigate([page.url]).then(() => {
        window.location.reload();
      });
    }
    this.closeMenu();
  }

  closeMenu() {
    this.menu.close();
  }

  closeSubMenu(page: MenuItem) {
    page.expanded = false;
    this.closeMenu();
  }
}