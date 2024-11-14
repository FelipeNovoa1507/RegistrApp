import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { InteractionService } from '../service/interaction.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MenuController } from '@ionic/angular';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-restablecercon',
  templateUrl: './restablecercon.page.html',
  styleUrls: ['./restablecercon.page.scss'],
})
export class RestablecerconPage implements OnInit {
  email: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off';
  public actualPasswordType: string = 'password';
  public actualPasswordIcon: string = 'eye-off';
  public confirmPasswordType: string = 'password';
  public confirmPasswordIcon: string = 'eye-off';
  isAuthenticated: boolean = false;

  constructor(
    public app: AppComponent,
    private authService: AuthService,
    private interaction: InteractionService,
    private router: Router,
    public menuCtrl: MenuController,
    private afAuth: AngularFireAuth
  ) { }

  
  ionViewWillLeave() {
    this.menuCtrl.enable(true); // Habilitar el menú cuando se salga de la página de login
  }
  


  async ngOnInit() {
    this.menuCtrl.enable(false); // Deshabilitar el menú
    this.afAuth.authState.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }
  
  resetPassword() {
    if (this.email) {
      this.interaction.presentLoading('Enviando correo de restablecimiento...');
      this.authService.resetPassword(this.email)
        .then(() => {
          this.interaction.closeLoading();
          this.interaction.presentToast('Correo de restablecimiento enviado');
          this.clearFields(); // Limpiar los campos después de enviar el correo
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          this.interaction.closeLoading();
          console.error('Error al enviar el correo de restablecimiento:', error);
          this.interaction.presentToast('Error al enviar el correo de restablecimiento');
        });
    } else {
      this.interaction.presentToast('Por favor, ingrese un correo electrónico válido');
    }
  }


  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.interaction.presentToast('Las contraseñas no coinciden');
      return;
    }

    this.interaction.presentLoading('Cambiando contraseña...');
    this.authService.changePassword(this.currentPassword, this.newPassword)
      .then(() => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Contraseña cambiada exitosamente');
        this.clearFields(); // Limpiar los campos después de cambiar la contraseña
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.interaction.closeLoading();
        console.error('Error al cambiar la contraseña:', error);
        this.interaction.presentToast('Error al cambiar la contraseña');
      });
  }

  clearFields() {
    this.email = '';
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
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

  toggleActualPasswordVisibility() {
    if (this.actualPasswordType === 'password') {
      this.actualPasswordType = 'text';
      this.actualPasswordIcon = 'eye';
    } else {
      this.actualPasswordType = 'password';
      this.actualPasswordIcon = 'eye-off';
    }
  }

  toggleConfirmPasswordVisibility() {
    if (this.confirmPasswordType === 'password') {
      this.confirmPasswordType = 'text';
      this.confirmPasswordIcon = 'eye';
    } else {
      this.confirmPasswordType = 'password';
      this.confirmPasswordIcon = 'eye-off';
    }
  }
}
