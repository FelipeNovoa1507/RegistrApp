import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { InteractionService } from '../service/interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off';
  credenciales = {
    correo: "",
    password:""
  };

  constructor(
    private interaction: InteractionService,
    public router: Router, 
    public menuCtrl: MenuController,
    public alertController: AlertController,
    private auth : AuthService,
     
  ) {  }

  
  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }
  
  async ngOnInit() {
    this.menuCtrl.enable(false); // Deshabilitar el menú
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true); // Habilitar el menú cuando se salga de la página de login
  }

  async login(){
    try{
      this.interaction.presentLoading('Iniciando sesión...');
      console.log('credenciales :', this.credenciales);
      const res = await this.auth.login(this.credenciales.correo, this.credenciales.password)
      if (res) {
        console.log('res :', res);
        this.interaction.closeLoading();
        this.router.navigate(['/main']);
      }
    } catch (error){
      this.interaction.closeLoading();
      this.alertController.create
      ({
        header: 'Error',
        message: 'Correo o contraseña incorrectos',
        buttons: ['OK']
      }).then(res => {
        res.present();
      });
  }
  }
}