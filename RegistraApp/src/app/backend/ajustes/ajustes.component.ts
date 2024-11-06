import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Resultado } from 'src/app/models/models.component';
import { AuthService } from 'src/app/service/auth.service';
import { FirestoreService } from 'src/app/service/firestore.service';
import { InteractionService } from 'src/app/service/interaction.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent  implements OnInit {
  resultados: Resultado[] = [];

  public data: Resultado = {
    usuario: {
      id: '',
      nombre: '',
      apellido: '',
      rut: '',
      edad: 0,
      correo: '',
      carrera: '',
      semestre: '',
      password: '',
      genero: '',
      tipo: ''
    }

  }

  constructor(
    private authService: AuthService,
    private database: FirestoreService, 
    private interaction: InteractionService,
    public router: Router,
  ) { }

  ngOnInit() {
    console.log('AjustesComponent');
    this.getResultados();
  }

   async crearNuevoResultado(){
    console.log('data', this.data);
    this.interaction.presentLoading('Guardando...');
    const usuario = await this.authService.createUser(this.data.usuario).catch((error) => {
      console.log('error', error);
    });
    if (usuario) {
      console.log('usuario creado');
      const path = 'Usuarios'
      const id= this.database.getId(); 
      this.data.usuario.id = id;
      this.database.crearDoc(this.data, path, id).then((res) => {
        console.log('guardado con exito', res);
        this.interaction.closeLoading();
        this.interaction.presentToast('Guardado con éxito');
        this.router.navigate(['/login']);
  
      }) 
    } else {
      this.interaction.closeLoading();
      this.interaction.presentToast('Error al guardar');
    }
  }


  getResultados(){
    this.database.getResultados<Resultado>('Usuarios').subscribe(res => {
      console.log('esta es la lectura de datos:  ', res);
      this.resultados = res;
    })
  }
}