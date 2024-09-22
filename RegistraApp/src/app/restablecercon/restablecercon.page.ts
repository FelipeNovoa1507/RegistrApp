import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restablecercon',
  templateUrl: './restablecercon.page.html',
  styleUrls: ['./restablecercon.page.scss'],
})
export class RestablecerconPage implements OnInit {
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off';
  public actualPasswordType: string = 'password';
  public actualPasswordIcon: string = 'eye-off';
  public confirmPasswordType: string = 'password';
  public confirmPasswordIcon: string = 'eye-off';

  constructor() { }

  ngOnInit() {
    console.log('RegistroPage inicializado');
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
