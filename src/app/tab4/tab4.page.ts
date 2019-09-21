import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalhesPage } from '../detalhes/detalhes.page';
import { Item } from 'src/assets/extra/item';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  eventos: Observable<any[]>; //Só declaração de uma lista de variáveis

  constructor(
    db: AngularFirestore, //Confira App.components.ts
    public modalCtrl: ModalController
  ) {
    let currentUser = firebase.auth().currentUser; //Consegue o ID do usuário logago
    this.eventos = db.collection('eventos').valueChanges(); //consegue os valores da coelção noticias
  }

  async presentModal(item: Item) {
    const modal = await this.modalCtrl.create({
      component: DetalhesPage,
      componentProps: {
        item: item
      }
    });
    return await modal.present();
  }

  ngOnInit() {
  }

}
