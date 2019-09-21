import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Item } from 'src/assets/extra/item';
import { NoticiasPage } from '../noticias/noticias.page';
import { MensagemPage } from '../mensagem/mensagem.page';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  mensagens: Observable<any[]>; //Só declaração de uma lista de variáveis

  constructor(
    db: AngularFirestore, //Confira App.components.ts
    public modalCtrl: ModalController) {
    let currentUser = firebase.auth().currentUser; //Consegue o ID do usuário logago
    this.mensagens = db.collection('Pais').doc(currentUser.uid).collection('mensagens').valueChanges(); //consegue os valores dos documentos do usuario logado entrando na pasta pais, documento do pai logado, coleção mensagens
  }
  ngOnInit() {
  }

  //Função que chama a pagina na forma de um modal, enviando dados a ela
  async presentModal(item: Item) {
    const modal = await this.modalCtrl.create({
      component: MensagemPage,
      componentProps: {
        item: item
      }
    });
    return await modal.present();
  }

}
