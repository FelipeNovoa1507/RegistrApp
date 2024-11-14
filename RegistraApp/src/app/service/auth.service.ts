import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService } from './firestore.service';
import { InteractionService } from './interaction.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Usuario } from '../models/models.component';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSubscription: Subscription = new Subscription();
  public userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public userNameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public userLastNameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public userSeccionSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public userIdProfesorSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public userIdAlumnoSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public userCorreoSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public userRole = this.userRoleSubject.asObservable();
  public userCorreo = this.userCorreoSubject.asObservable();
  public userIdProfesor = this.userIdProfesorSubject.asObservable();
  public userIdAlumno = this.userIdAlumnoSubject.asObservable();
  public userName = this.userNameSubject.asObservable();
  public userLastName = this.userLastNameSubject.asObservable();
  public userSeccion = this.userSeccionSubject.asObservable();
  public role = false;

  constructor(
    public authfirebase: AngularFireAuth,
    private firestoreService: FirestoreService,
    private interaction: InteractionService,
    
  ) {}

  login(correo: string, contraseña: string){
    return this.authfirebase.signInWithEmailAndPassword(correo, contraseña);
  }

  logout(){
    return this.authfirebase.signOut();
  }

  createUser(datos: any){
    return this.authfirebase.createUserWithEmailAndPassword(datos.correo, datos.password);
  }

  resetPassword(email: string) {
    return this.authfirebase.sendPasswordResetEmail(email);
  }

  changePassword(currentPassword: string, newPassword: string) {
    return this.authfirebase.currentUser.then(user => {
      if (user && user.email) {
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(credential)
          .then(() => {
            return user.updatePassword(newPassword);
          });
      } else {
        return Promise.reject('No user is currently signed in.');
      }
    });
  }
  presentLoading() {
    this.interaction.presentLoading('Cargando...');
  }

  closeLoading() {
    this.interaction.closeLoading();
  }


  getUserRole() {
    this.authSubscription = this.authfirebase.authState.subscribe(user => {
      if (user && user.email) {
        const email = user.email;
        const path = 'Usuarios';
        this.firestoreService.getCollectionQuery<Usuario>(path, 'correo', email).subscribe({
          next: (data) => {
            if (data && data.length > 0) {
              this.userRoleSubject.next(data[0].tipo);
              this.userNameSubject.next(data[0].nombre);  
              this.userLastNameSubject.next(data[0].apellido);  
              this.userSeccionSubject.next(data[0].seccion);
              this.userIdProfesorSubject.next(data[0].idProfesor);
              this.userIdAlumnoSubject.next(data[0].idAlumno);
              this.userCorreoSubject.next(data[0].correo);
              this.role = true;
            } else {
              console.error('Usuario no encontrado en la base de datos');
            }
            this.closeLoading(); // Cerrar el indicador de carga aquí
          },
          error: (error) => {
            console.error('Error al obtener datos de Firestore:', error);
            this.closeLoading(); // Cerrar el indicador de carga en caso de error
          },
          complete: () => {
            console.log('Consulta a Firestore completada');
            this.closeLoading(); // Asegurarse de cerrar el indicador de carga al completar
          }
        });
      } else {
        console.error('No hay usuario autenticado o el correo es nulo');
        this.closeLoading(); // Cerrar el indicador de carga si no hay usuario autenticado
      }
    });
  }
  
}