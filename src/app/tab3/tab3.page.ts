import { Component, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ReqPage } from '../req/req.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';





@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnChanges {

  // Dados para os cards
  req: Observable<any[]>;

  banco: AngularFirestore;
  typo: any;

  sMod: boolean;
  sFar: boolean;
  sReu: boolean;



  constructor(
    public db: AngularFirestore,
    public modalCtrl: ModalController,
    public alertController: AlertController,
    public fAuth: AngularFireAuth,
    public router: Router,
  ) {
    this.banco = db;
    this.req = db.collection('requisicoes').valueChanges();
    this.verifiUser();

    db.collection('requisicoes').doc('modulos').get().toPromise().then(doc => {
      this.sMod = doc.data().status;
    });

    db.collection('requisicoes').doc('fardamentos').get().toPromise().then(doc => {
      this.sFar = doc.data().status;
    });

    db.collection('requisicoes').doc('reunioes').get().toPromise().then(doc => {
      this.sReu = doc.data().status;
    });

  }

  status() {

    this.db.collection('requisicoes').doc('fardamentos').update({
      status: this.sFar,
    });

    this.db.collection('requisicoes').doc('modulos').update({
      status: this.sMod,
    });

    this.db.collection('requisicoes').doc('reunioes').update({
      status: this.sReu,
    });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Algo deu errado',
      message,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    alert.present();
  }

  async presentModal(tipo: any) {
    if (this.typo === 'adm') {
      const modal = await this.modalCtrl.create({
        component: ReqPage,
        componentProps: {
          tipo,
          typo: this.typo
        }
      });

      return await modal.present();

    } else {

      if (tipo.status === false) {
        this.presentAlert('Pedidos de ' + tipo.nome + ' não estão disponíveis no momento');
        console.log('Sem Reunião');
      } else {
        const modal = await this.modalCtrl.create({
          component: ReqPage,
          componentProps: {
            tipo,
            typo: 'entrou como pai'
          }
        });
        return await modal.present();
      }
    }
  }

  verifiUser() {
    try {
      const currentUser = firebase.auth().currentUser;
      this.typo = '';
      this.banco.collection('indice').doc(currentUser.email).get().toPromise()
        .then(doc => {
          this.typo = doc.data().tipo;
          console.log('funfa: ', doc.data().tipo)
        })
        .catch(err => {
          this.typo = 'Error getting document' + err;
        });
    } finally {
      console.log('Deu super certo!');
    }
  }

  // Função que chama um alert
  async presentAlert2(mensagem) {
    const alert = await this.alertController.create({
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

  ngOnChanges() {
  }


}
