import { Component } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ModalController } from '@ionic/angular';
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

  constructor(
    db: AngularFirestore, //Confira App.components.ts
    //private datePicker: DatePicker,//Útil para a visão dos psicólogos
    public modalCtrl: ModalController) {
    let currentUser = firebase.auth().currentUser; //Consegue o ID do usuário logago
    this.informes = db.collection('pais').doc(currentUser.uid).collection('informes').valueChanges(); //consegue os valores dos documentos do usuario logado entrando na pasta pais, documento do pai logado, coleção mensagens

    //this.customPickerOptions = {
    //  buttons: [{
    //    text: 'Save',
    //    handler: () => console.log('Clicked Save!')
    //  }, {
    //    text: 'Log',
    //    handler: () => {
    //      console.log('Clicked Log. Do not Dismiss.');
    //      return false;
    //    }
    //  }]
    //};
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

