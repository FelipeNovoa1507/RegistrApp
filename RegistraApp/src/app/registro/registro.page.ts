import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AjustesComponent } from '../backend/ajustes/ajustes.component'; // Ajusta la ruta según sea necesario


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  providers: [AjustesComponent]   
})
export class RegistroPage implements OnInit {
  public registroForm: FormGroup;
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off';
  public confirmPasswordType: string = 'password';
  public confirmPasswordIcon: string = 'eye-off';

  constructor(
    public ajustesComponent: AjustesComponent,
    public formBuilder: FormBuilder, 
    public router: Router, 
    public menuCtrl: MenuController
  ) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      rut: ['', [Validators.required, this.validarRut]],
      edad: ['', [Validators.required, Validators.min(18)]],
      correo: ['', [Validators.required, Validators.email]],
      carrera: ['', Validators.required],
      genero: ['', Validators.required],
      semestre: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  crearNuevoResultado() {
    this.ajustesComponent.crearNuevoResultado();
  }

  async ngOnInit() {
    this.menuCtrl.enable(false); // Deshabilitar el menú
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true).then(() => {
      window.location.reload();
    }); 
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

  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
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

  onSubmit() {
    console.log('lol');
    }
  }
