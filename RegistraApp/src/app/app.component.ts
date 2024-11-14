import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { Subscription } from 'rxjs';
import { InteractionService } from './service/interaction.service';

interface MenuItem {
  title: string;
  url?: string;
  icon: string;
  expanded?: boolean;
  action?: () => void;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  authSubscription: Subscription = new Subscription();
  role: boolean = false;
  userRole: string | null = null;
  segment: string = '';
  nombre: string | null = null;
  apellido: string | null = null;
  correo: string | null = null;



  public appPages: MenuItem[] = [
    { title: 'Inicio', url: '/main', icon: 'home' },
    { title: 'Perfil de Usuario', url: '/perfil', icon: 'person-circle' },
    ...(this.role === true ? [
      { title: 'Asignatura', url: '/asignaturas', icon: 'book' },
      { title: 'Asistencia', url: '/asistencias', icon: 'calendar' }
    ] : []),
    { title: 'Modificar Contraseña', url: '/restablecercon', icon: 'create' },
    { title: 'Registro Asistencia', url: '/asistencia-qr', icon: 'calendar-clear' },
    { title: 'Ayuda/Soporte', url: '/ayuda', icon: 'information-circle' },
    { title: 'Cerrar Sesión', icon: 'log-out', action:  () => this.logout() }
  ];
  
  constructor(
    private menu: MenuController, 
    private platform: Platform,
    public router: Router,
    private authService: AuthService,
    private interaction: InteractionService,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }
  
  updateAppPages() {
    this.appPages = [
      { title: 'Inicio', url: '/main', icon: 'home' },
      { title: 'Perfil de Usuario', url: '/perfil', icon: 'person-circle' },
      ...(this.role === false ? [
        { title: 'Asistencia', url: '/asistencias', icon: 'calendar' }
      ] : []),
      { title: 'Asignatura', url: '/asignaturas', icon: 'book' },
      { title: 'Modificar Contraseña', url: '/restablecercon', icon: 'create' },
      { title: 'Registro Asistencia', url: '/asistencia-qr', icon: 'calendar-clear' },
      { title: 'Ayuda/Soporte', url: '/ayuda', icon: 'information-circle' },
      { title: 'Cerrar Sesión', icon: 'log-out', action:  () => this.logout() }
    ];
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      ScreenOrientation.lock({ orientation: 'portrait' });
    });
  }
  
  ngOnInit() {
    console.log('ngOnInit');
    this.authService.userRole.subscribe(role => {
      this.userRole = role;
      this.role = this.userRole === 'Profesor' ? true : false;
      this.updateAppPages();
    });

    this.authService.userName.subscribe(nombre => {
      if (nombre) {
        this.nombre = nombre;
      }
    });
    this.authService.userLastName.subscribe(apellido => {
      if (apellido) {
        this.apellido = apellido;
      }
    });
    this.authService.userCorreo.subscribe(correo => {
      if (correo) {
        this.correo = correo;
      }
    });
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

  handleBackButton(event: Event) {
    event.preventDefault(); // Prevenir la acción predeterminada del botón de retroceso
    this.interaction.closeLoading().then(() => {
      this.navCtrl.back(); // Navegar a la página anterior después de cerrar el indicador de carga
      this.interaction.closeLoading();
    });
  }
}