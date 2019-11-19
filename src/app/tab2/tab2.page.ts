import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { InformePage } from '../informe/informe.page';
import { Item } from 'src/assets/extra/item';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  // myDate: string;
  // customPickerOptions: any;
 
  // Só declaração de uma lista de variáveis
  informes: Observable<any[]>;

  informesModifi = {};

  banco: AngularFirestore;

  user: any;

  constructor(
    db: AngularFirestore, // Confira App.components.ts  
    public modalCtrl: ModalController,
    public fAuth: AngularFireAuth,
    public router: Router,
    public alertController: AlertController) {
    const currentUser = firebase.auth().currentUser; // Consegue o ID do usuário logado
    this.user = db.collection('indice').doc(currentUser.email).get().toPromise()
      .then(doc => {
        this.user = doc.data();
        for (const filho in this.user.atendido) {
          const filhoo = this.user.atendido[filho];
          console.log('filho:', filhoo);
          this.informes = db.collection('atendidos').doc(filhoo).collection('informes', ref =>
      ref.orderBy('dateAtend', 'desc')).valueChanges();
        }
      });
    this.banco = db;

  }

  async presentModal(item: Item) {
    const modal = await this.modalCtrl.create({
      component: InformePage,
      componentProps: {
        item
      }
    });
    return await modal.present();
  }

  // Função que chama um alert
  async presentAlert(mensagem) {
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
    this.presentAlert('Realmente quer sair?');

  }
}

