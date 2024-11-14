import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from '../models/models.component';
import { InteractionService } from 'src/app/service/interaction.service';
import { AuthService } from 'src/app/service/auth.service'; 

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, OnDestroy {

  userName: string | null = null;
  userRole: string | null = null;
  authSubscription: Subscription = new Subscription();
  usuarios: Usuario[] = [];
  private firstLoad: boolean = true;
  
  constructor(
    private interaction: InteractionService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    console.log('MainPage: ngOnInit');
    this.authService.presentLoading(); // Asegurarse de cerrar el indicador de carga al destruir el componente

  }

  ionViewWillEnter() {
    if (this.firstLoad) {
      this.loadUserRole();
      this.firstLoad = false;
      
    }
  }

  ionViewWillLeave() {
    this.interaction.closeLoading();
    
  }
  
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.interaction.closeLoading();
  }

  loadUserRole() {
    this.authService.getUserRole();

    this.authService.userName.subscribe(name => {
      this.userName = name;
    });
    
    this.authService.userRole.subscribe(role => {
      this.userRole = role;
      this.interaction.closeLoading(); // Cerrar el indicador de carga aquí
    }, error => {
      console.error('Error al obtener el rol del usuario:', error);
      this.interaction.closeLoading(); // Cerrar el indicador de carga en caso de error
    });
  }
}