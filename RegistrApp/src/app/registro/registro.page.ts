import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  rut: string;
  rutInvalido: boolean;
  password: string;
  passwordInvalida: boolean;
  confirmPassword: string;
  confirmPasswordInvalida: boolean;

  constructor() {
    this.rut = '';
    this.rutInvalido = false;
    this.password = '';
    this.passwordInvalida = false;
    this.confirmPassword = '';
    this.confirmPasswordInvalida = false;
  }

  validarRut() {
    this.rutInvalido = !this.validarRutHelper(this.rut);
  }

  validarRutHelper(rut: string): boolean {
    rut = rut.replace("-", "").replace(".", "");
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();

    const reversa = cuerpo.split("").reverse().map(Number);
    let factor = 2;
    let suma = 0;

    for (const d of reversa) {
      suma += d * factor;
      factor = factor === 7 ? 2 : factor + 1;
    }

    const resto = suma % 11;
    const dvCalculado = resto === 0 ? '0' : resto === 1 ? 'K' : String(11 - resto);

    return dv === dvCalculado;
  }

  validarPassword() {
    this.passwordInvalida = this.password.length < 8;
  }

  validarConfirmPassword() {
    this.confirmPasswordInvalida = this.password !== this.confirmPassword;
  }
}