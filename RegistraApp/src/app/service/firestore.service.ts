import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }



  crearDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);

  }

  getId(){
    return this.firestore.createId();
  }

  getResultados<tipo>(path: string){
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }


  getDoc() {
    console.log('leyendo documento');
    this.firestore.collection('Estudiantes').valueChanges().subscribe(res => {
      console.log('res :', res);

    }); 
  }

}
