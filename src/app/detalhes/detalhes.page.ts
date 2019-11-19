
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Item } from 'src/assets/extra/item';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  info: Item;
  public typo;

  constructor(
    public modalCtrl: ModalController,
    public banco: AngularFirestore, // Confira App.components.ts
    navParams: NavParams) {
    this.info = navParams.get('item');
    this.verifiUser();
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  verifiUser() {
    try {
      const currentUser = firebase.auth().currentUser;
      this.typo = '';
      this.banco.collection('indice').doc(currentUser.email).get().toPromise()
        .then(doc => {
          this.typo = doc.data().tipo;
          console.log('funfa: ', doc.data().tipo);
        })
        .catch(err => {
          this.typo = 'Error getting document' + err;
        });
    } finally {
      console.log('Deu super certo!');
    }
  }

  ngOnInit() {
  }

}
