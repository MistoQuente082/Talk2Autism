import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { Item } from 'src/assets/extra/item';
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
  @ViewChild(IonSlides) slides: IonSlides;
  public wavesPosition: 0;
  private wavesDifference: 100;



  mensagens: Observable<any[]>; // Só declaração de uma lista de variáveis

  constructor(
    db: AngularFirestore, // Confira App.components.ts
    public modalCtrl: ModalController) {
    const currentUser = firebase.auth().currentUser; // Consegue o ID do usuário logago
    // consegue os valores dos documentos do usuario logado entrando na pasta pais, documento do pai logado, coleção mensagens
    this.mensagens = db.collection('Pais').doc(currentUser.uid).collection('mensagens').valueChanges();
  }
  ngOnInit() { }

  segmentChanged(event: any) {
    if (event.detail.value === 'recebidos') {
      this.slides.slidePrev();
      this.wavesPosition += this.wavesDifference;
    } else {
      this.slides.slideNext();
      this.wavesPosition -= this.wavesDifference;
    }
  }

  // Função que chama a pagina na forma de um modal, enviando dados a ela
  async presentModal(item: Item) {
    const modal = await this.modalCtrl.create({
      component: MensagemPage,
      componentProps: {
        item
      }
    });
    return await modal.present();
  }

}
