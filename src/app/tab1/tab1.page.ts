import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NoticiasPage } from '../noticias/noticias.page';
import { Item } from 'src/assets/extra/item';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  noticias: Observable<any[]>; //Só declaração de uma lista de variáveis

  constructor(
    db: AngularFirestore, //Confira App.components.ts
    public modalCtrl: ModalController) {

    let currentUser = firebase.auth().currentUser; //Consegue o ID do usuário logago
    this.noticias = db.collection('noticias').valueChanges(); //consegue os valores da coelção noticias
  }

  // Função que chama a pagina na forma de um modal, enviando dados a ela
  async presentModal(item: any) {
    const modal = await this.modalCtrl.create({
      component: NoticiasPage,
      componentProps: {
        item
      }
    });
    return await modal.present();
  }

}
