import { Component } from '@angular/core';
import { ModalController, AlertController, PopoverController, NavController } from '@ionic/angular';
import { NoticiasPage } from '../noticias/noticias.page';
import { Item } from 'src/assets/extra/item';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NovaNoticiaPage } from '../nova-noticia/nova-noticia.page';
import { EditarNoticiaPage } from '../editar-noticia/editar-noticia.page';
import { async } from 'q';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  noticias: Observable<any[]>; //Só declaração de uma lista de variáveis
  banco: AngularFirestore;

  typo: any;

  constructor(
    public db: AngularFirestore, //Confira App.components.ts
    public fAuth: AngularFireAuth,
    public router: Router,
    public alertController: AlertController,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController) {
    this.noticias = db.collection('noticias').valueChanges(); //consegue os valores da coelção noticias
    this.banco = db;
    this.verifiUser();
  }


  //Função que chama um alert
  async presentAlert(mensagem) {
    const alert = await this.alertController.create({
      header: mensagem.titulo,
      message: mensagem.descricao + "Disponibilidade: " + mensagem.postar,
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

    const alert1 = await this.alertController.create({
      header: mensagem.nome,
      message: mensagem.mensagem,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Editar',
          handler: async () => {
            this.editarNoticia(mensagem);
          }
        }
      ]
    });

    if (this.typo === 'adm') {
      await alert1.present();
    }

    else {
      await alert.present();

    }
  }

  //Função que chama um alert
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

  sair() {
    this.presentAlert2('Realmente quer sair?');

  }

  async editarNoticia(item: any) {
    const modal = await this.modalCtrl.create({
      component: EditarNoticiaPage,
      componentProps: {
        item
      }
    });
    return await modal.present();
  }

  async novaNoticia(item: any) {
    const modal = await this.modalCtrl.create({
      component: NovaNoticiaPage,
      componentProps: {
        item
      }
    });
    return await modal.present();
  }
}