import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { NavController } from '@ionic/angular';

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
    { title: 'Cerrar Sesión', icon: 'log-out', action: () => this.logout() }
  ];

  public filteredAppPages: MenuItem[] = [];
  userRole: string | null = null;

  constructor(
    private menu: MenuController, 
    private platform: Platform,
    public navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      ScreenOrientation.lock({ orientation: 'portrait' });
    });
  }

  ngOnInit(){
    const user = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userRole = userObj.role;
      console.log('User role:', this.userRole); // Verificar el rol del usuario
      this.filterMenuItems();
    }
  }

  filterMenuItems() {
    if (this.userRole === 'profe') {
      this.filteredAppPages = this.appPages.map(page => {
        if (page.children) {
          page.children = page.children.filter(child => child.title !== 'Asignatura' && child.title !== 'Asistencia');
        }
        return page;
      }).filter(page => page.children?.length !== 0 || !page.children);
    } else {
      this.filteredAppPages = this.appPages;
    }
    console.log('Filtered menu items:', this.filteredAppPages); // Verificar los elementos filtrados
  }

  async logout() {
    localStorage.clear();
    this.navCtrl.navigateRoot('/login');
  }

  toggleMenu(page: MenuItem) {
    page.expanded = !page.expanded;
  }

  handlePageAction(page: MenuItem) {
    if (page.action) {
      page.action();
    } else if (page.url) {
      this.navCtrl.navigateRoot(page.url);
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