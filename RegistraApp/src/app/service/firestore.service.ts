import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  getUserData(id: string): Observable<any> {
    return this.firestore.collection('Usuarios').doc(id).valueChanges();
  }

  crearDoc(data: any, path: string, id: string) {
    return this.firestore.collection(path).doc(id).set(data);

  }

  getDoc() {
    console.log('leyendo documento');
    this.firestore.collection('Estudiantes').valueChanges().subscribe(res => {
      console.log('res :', res);

    }); 
  }

  eliminarDoc(path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).delete();

  }
  
  actualizarDoc(data: any, path: string, id: string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).update(data);
  }
  
  getId(){
    return this.firestore.createId();
  }

  getCollection<tipo>(path: string): Observable<tipo[]> {
    const data: AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>(path);
    return data.valueChanges();
  }

  getAsistenciasByAlumno(idAlumno: string): Observable<any[]> {
    return this.firestore.collection('AsistenciaAlumno', ref => ref.where('idAlumno', '==', idAlumno)).valueChanges();
  }

  getCollectionQuery<tipo>(path: string, parametro: string, value: string) {
    const data: AngularFirestoreCollection<tipo> = 
      this.firestore.collection<tipo>(path, ref => ref.where(parametro, '==', value));
    return data.valueChanges();
  }

  getCollectionAll<tipo>(path: string, parametro: string, condicion: any, busqueda: string, startAt: any) {
    if (startAt == null) {
      startAt = new Date();
    }
    const collection = this.firestore.collectionGroup<tipo>(path, 
      ref => ref.where( parametro, condicion, busqueda)
                .orderBy('fecha', 'desc')
                .limit(1)
                .startAfter(startAt)
      );
    return collection.valueChanges();
  }

  getCollectionPaginada<tipo>(path: string, limit: number, startAt: any) {
    if (startAt == null) {
      startAt = new Date();
    }
    const collection = this.firestore.collection<tipo>(path, 
      ref => ref.orderBy('fecha', 'desc')
                .limit(limit)
                .startAfter(startAt)
      );
    return collection.valueChanges();
  }


  getResultados<tipo>(path: string){
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }



}
