import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off';


  constructor(public formBuilder: FormBuilder, public navCtrl: NavController) {
    
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {
    console.log('RegistroPage inicializado');
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario válido', this.loginForm.value);
      localStorage.setItem('ingresado', "true");
      this.navCtrl.navigateRoot('main');
    } else {
      console.log('Formulario inválido');
    }
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

}
