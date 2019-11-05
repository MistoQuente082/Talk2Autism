import { Component } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
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
  //myDate: string;
  //customPickerOptions: any;

  //Só declaração de uma lista de variáveis
  informes: Observable<any[]>;

  informesModifi = {};

  banco: AngularFirestore;

  user: any;

  constructor(
    db: AngularFirestore, // Confira App.components.ts  
    // private datePicker: DatePicker,//Útil para a visão dos psicólogos
    public modalCtrl: ModalController,
    public fAuth: AngularFireAuth,
    public router: Router,
    public alertController: AlertController) {
    let currentUser = firebase.auth().currentUser; // Consegue o ID do usuário logago
    // consegue os valores dos documentos do usuario logado entrando na pasta pais, documento do pai logado, coleção mensagens
    this.user = db.collection('indice').doc(currentUser.email).get().toPromise()
      .then(doc => {
        this.user = doc.data();
        for (var filho in this.user.atendido) {
          let filhoo = this.user.atendido[filho]
          console.log('filho:', filhoo);
          this.informes = db.collection('atendidos').doc(filhoo).collection('informes').valueChanges();
        }
      })
    this.banco = db;

    console.log()
  }

  async presentModal(item: Item) {
    const modal = await this.modalCtrl.create({
      component: InformePage,
      componentProps: {
        item: item
      }
    });
    return await modal.present();
  }


  //Função que chama um alert
  async presentAlert(aviso) {
    const alert = await this.alertController.create({
      header: aviso.atendido,
      message: aviso.alimentacao,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
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


  sair() {
    this.presentAlert2('Realmente quer sair?');

  }

  // showDatepicker() {
  //   this.datePicker.show({
  //     date: new Date(),
  //     mode: 'date',
  //     androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
  //     okText: "Save Date",
  //     todayText: "Set Today"
  //   }).then(
  //     date => {
  //       this.myDate = date.getDate() + "/" + date.toLocaleString('default', { month: 'long' }) + "/" + date.getFullYear();
  //     },
  //     err => console.log('Error occurred while getting date: ', err)
  //   );
  // }
}

