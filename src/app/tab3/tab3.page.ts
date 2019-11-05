import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ReqPage } from '../req/req.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  // Dados para os cards
  req: Observable<any[]>;

  banco: AngularFirestore;
  typo: any;

  status = {
    fard: false,
    mod: false,
    reun: false
  };


  constructor(
    db: AngularFirestore,
    public modalCtrl: ModalController,
    public alertController: AlertController
  ) {
    this.banco = db;
    this.req = db.collection('requisicoes').valueChanges();
    this.verifiUser();
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

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    console.log(this.typo);
  }

}
