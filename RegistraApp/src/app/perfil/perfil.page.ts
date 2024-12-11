import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { AppComponent } from '../app.component';
import { Subscription } from 'rxjs';
import { InteractionService } from '../service/interaction.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  providers: [AppComponent]
})
export class PerfilPage implements OnInit, OnDestroy {

  private firstLoad: boolean = true;
  authSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    public app: AppComponent,
    public interaction: InteractionService
  ) { }

  ngOnInit() {
    console.log('PerfilPage: ngOnInit');
    this.authService.presentLoading(); // Mostrar el indicador de carga al iniciar
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
    this.interaction.closeLoading()
  }

  loadUserRole() {
    this.authService.getUserRole();
  }
}