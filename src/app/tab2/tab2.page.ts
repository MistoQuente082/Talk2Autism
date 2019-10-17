import { Component } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ModalController, AlertController } from '@ionic/angular';
import { InformePage } from '../informe/informe.page';
import { Item } from 'src/assets/extra/item';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  //myDate: string;
  //customPickerOptions: any;

  informes: Observable<any[]>; //Só declaração de uma lista de variáveis
  banco: AngularFirestore;

  constructor(
    db: AngularFirestore, //Confira App.components.ts
    //private datePicker: DatePicker,//Útil para a visão dos psicólogos
    public modalCtrl: ModalController,
    public alertController: AlertController) {
    let currentUser = firebase.auth().currentUser; //Consegue o ID do usuário logago
    this.informes = db.collection('pais').doc(currentUser.email).collection('informes').valueChanges(); //consegue os valores dos documentos do usuario logado entrando na pasta pais, documento do pai logado, coleção mensagens
    this.banco = db;
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

