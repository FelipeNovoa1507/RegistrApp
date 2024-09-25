import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off';



  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public menuCtrl: MenuController,
    public alertController: AlertController,
    private authService: AuthService
  ) {
    
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required]],
      password: ['', Validators.required]
    });
   }

  async ngOnInit() {
    this.menuCtrl.enable(false); // Deshabilitar el menú
  }
  


  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true); // Habilitar el menú cuando se salga de la página de login
  }

  async onSubmit() {
      if (this.loginForm.valid) {
        console.log('Formulario válido', this.loginForm.value);
        const { correo, password } = this.loginForm.value;
        if (correo === 'Usuario1' && password === 'MiClav3') {
          localStorage.setItem('user', JSON.stringify({ correo, role: 'usuario1' }));
          this.navCtrl.navigateRoot('main').then(() => {
            window.location.reload();
          }); 
        } else if (correo === 'Profe' && password === 'Pato') {
          localStorage.setItem('user', JSON.stringify({ correo, role: 'profe' }));
          this.navCtrl.navigateRoot('main').then(() => {
            window.location.reload();
          }); 
        } else {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Credenciales incorrectas, inténtelo nuevamente.',
            buttons: ['OK']
          });
          await alert.present();
        }
      } else {
        console.log('Formulario inválido');
      }
    }
}