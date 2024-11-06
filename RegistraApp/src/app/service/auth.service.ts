import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(private authfirebase: AngularFireAuth) {}

  login(correo: string, contraseña: string){
    return this.authfirebase.signInWithEmailAndPassword(correo, contraseña);
  }

  logout(){
    return this.authfirebase.signOut();
  }

  createUser(datos: any){
    return this.authfirebase.createUserWithEmailAndPassword(datos.correo, datos.password);
  }

}


