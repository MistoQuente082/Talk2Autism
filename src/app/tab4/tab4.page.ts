

import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ActionSheetController, ToastController } from '@ionic/angular';
import { DetalhesPage } from '../detalhes/detalhes.page';

import { Item } from 'src/assets/extra/item';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
const reducer = (accumulator, currentValue) => accumulator + currentValue;
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Router } from '@angular/router';
registerLocaleData(localePt);

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  eventos: Observable<any[]>; // Só declaração de uma lista de variáveis
  public typo;
  public banco;

  constructor(
    public db: AngularFirestore, // Confira App.components.ts
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public fAuth: AngularFireAuth,
    public router: Router,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    public toastCtrl: ToastController,

  ) {
    this.banco = this.db;
    this.verifiUser();
    const currentUser = firebase.auth().currentUser; // Consegue o ID do usuário logago
    this.eventos = this.db.collection('eventos').valueChanges(); // consegue os valores da coelção noticias
  }

  async presentModal(item: Item) {
    const modal = await this.modalCtrl.create({
      component: DetalhesPage,
      componentProps: {
        item
      }
    });
    return await modal.present();
  }

  //Função que chama um alert
  async presentAlert2(mensagem) {
    const alert = await this.alertCtrl.create({
      header: 'Atenção',
      message: mensagem,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Sair',
          handler: async () => {
            console.log('Saiu!');
            await this.fAuth.auth.signOut();
            this.router.navigate(['/']);


          }
        }
      ]
    });
    await alert.present();
  }




  sair() {
    this.presentAlert2('Realmente quer sair?');

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

  async presentActionSheet(evento) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Excluir evento',
        icon: 'trash',
        cssClass: 'vermelho',
        handler: () => {
          this.excluir(evento);
          console.log('Tirar foto clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async excluir(evento) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Realmente deseja excluir?',
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Excluir',
          handler: async () => {
            // Coloca aqui para excluir
            this.db.collection("eventos", ref => ref.where('nomeEvento', '==', evento.nomeEvento)).get().toPromise()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  this.db.collection('eventos').doc(doc.id).delete();
                })
              });
            this.presentToast('Excluido com sucesso');
          }
        }
      ]
    });
    await alert.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }


  ngOnInit() {
    console.log();
    // Impressão da hora padrão: 09/02/2017 10:17:06
  }

}
