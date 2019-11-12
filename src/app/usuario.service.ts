import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public tipoUsuario;

  public banco;


  constructor(
    public db: AngularFirestore,
  ) {
    this.banco = db;

    this.verifiUser();


  }


  verifiUser() {
    try {
      const currentUser = firebase.auth().currentUser;
      this.banco.collection('indice').doc(currentUser.email).get().toPromise()
        .then(doc => {
          this.tipoUsuario = doc.data().tipo;
          console.log(this.tipoUsuario);
          console.log('funfa: ', doc.data().tipo);
        })
        .catch(err => {
          this.tipoUsuario = 'Error getting document' + err;
        });
    } finally {
      console.log('Deu super certo!');
      console.log(this.tipoUsuario);
    }

  }
}
