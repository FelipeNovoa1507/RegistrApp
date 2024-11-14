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
  rememberMe: boolean = false;

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
    this.loadCredentials();
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  async login(){
    try{
      this.interaction.presentLoading('Iniciando sesión...');
      console.log('credenciales :', this.credenciales);
      const res = await this.auth.login(this.credenciales.correo, this.credenciales.password)
      if (res) {
        console.log('res :', res);
        this.interaction.closeLoading();
        if (this.rememberMe) {
          this.saveCredentials(); 
        } else {
          this.clearCredentials();
        }
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
  saveCredentials() {
    localStorage.setItem('correo', this.credenciales.correo);
    localStorage.setItem('password', this.credenciales.password);
  }

  loadCredentials() {
    const correo = localStorage.getItem('correo');
    const password = localStorage.getItem('password');
    if (correo && password) {
      this.credenciales.correo = correo;
      this.credenciales.password = password;
      this.rememberMe = true;
    }
  }

  clearCredentials() {
    localStorage.removeItem('correo');
    localStorage.removeItem('password');
  }
}