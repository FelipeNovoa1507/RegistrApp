import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registroForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      rut: ['', [Validators.required, this.validarRut]],
      edad: ['', [Validators.required, Validators.min(18)]],
      correo: ['', [Validators.required, Validators.email]],
      carrera: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    // Inicialización del componente o lógica adicional
    console.log('RegistroPage inicializado');
  }

  validarRut(control: AbstractControl): { [key: string]: boolean } | null {
    const rut = control.value.replace("-", "").replace(".", "");
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

    return dv === dvCalculado ? null : { rutInvalido: true };
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registroForm.valid) {
      console.log('Formulario válido', this.registroForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}