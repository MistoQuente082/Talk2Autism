import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
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
  banco: AngularFirestore;

  constructor(
    db: AngularFirestore, //Confira App.components.ts
    public modalCtrl: ModalController,
    public alertController: AlertController) {
    let currentUser = firebase.auth().currentUser; //Consegue o ID do usuário logado
    this.noticias = db.collection('noticias').valueChanges(); //consegue os valores da coelção noticias
    this.banco = db;
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

  //Função que chama um alert
  async presentAlert(mensagem) {
    const alert = await this.alertController.create({
      header: mensagem.nome,
      message: mensagem.mensagem,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.banco.collection('noticias').doc(mensagem.id).update({
              leituras: firebase.firestore.FieldValue.increment(1)
            });

          }
        }, {
          text: 'Comentário',
          handler: () => {
            console.log('Yeetz!');
          }
        }
      ]
    });
    await alert.present();
  }

}
