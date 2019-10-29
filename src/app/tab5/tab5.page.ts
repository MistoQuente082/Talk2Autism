import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSlides, AlertController } from '@ionic/angular';

import { Item } from 'src/assets/extra/item';
import { MensagemPage } from '../mensagem/mensagem.page';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { EnvMensagemPage } from '../env-mensagem/env-mensagem.page';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  //@ViewChild(IonSlides) 
  slides: IonSlides;
  public wavesPosition: 0;
  private wavesDifference: 100;



  mensagensrec: Observable<any[]>; // Só declaração de uma lista de variáveis
  mensagensenv: Observable<any[]>; // Só declaração de uma lista de variáveis

  constructor(
    db: AngularFirestore, // Confira App.components.ts
    public modalCtrl: ModalController,
    public alertController: AlertController) {
    const currentUser = firebase.auth().currentUser; // Consegue o ID do usuário logago
    // consegue os valores dos documentos do usuario logado entrando na pasta pais, documento do pai logado, coleção mensagens
    this.mensagensrec = db.collection('indices').doc(currentUser.email).collection('mensagens_r').valueChanges();
    this.mensagensenv = db.collection('indices').doc(currentUser.email).collection('mensagens_e').valueChanges();
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


  //Função que chama um alert
  async presentAlertConfirm(mensagem) {
    const alert = await this.alertController.create({
      header: mensagem.mRemetente + ' :  ' + mensagem.mAssunto,
      message: mensagem.mConteudo,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Responder',
          handler: () => {
            this.presentModal2();
          }
        }
      ]
    });
    await alert.present();
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

  async presentModal2() {
    const modal = await this.modalCtrl.create({
      component: EnvMensagemPage
    });
    return await modal.present();
  }

}
