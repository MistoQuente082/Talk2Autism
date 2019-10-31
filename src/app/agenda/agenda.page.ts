import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController, NavDelegate, NavParams } from '@ionic/angular';
import { Item } from 'src/assets/extra/item';
import { AngularFirestore } from '@angular/fire/firestore';

import * as moment from 'moment';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {
  public conduct: number;
  public dateAtend: Date = new Date();
  public pInput: Date;
  public pOutput: Date;
  public comeu: boolean;
  public nTime: number;



  info: any;
  constructor(
    public db: AngularFirestore,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public alertController: AlertController,
    public navParams: NavParams) {
    this.info = navParams.get('item');
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  mudaData(event) {
    this.dateAtend = new Date(event.detail.value);
    console.log('DIA', this.dateAtend);

  }

  mudaIn(event) {
    this.pInput = new Date(event.detail.value);
    console.log('Chegada:', this.pInput);
  }

  mudaOut(event) {
    this.pOutput = new Date(event.detail.value);
    console.log('Saida:', this.pInput);
  }

  send() {
    if (this.pInput === undefined || this.pOutput === undefined ||
      this.nTime === undefined) {
      this.presentToast('Preencha os campos!');
    }

    else {
      this.presentAlert();
    }
  }

  subInform() {
    if (this.comeu != true) {
      this.comeu = false;
    }
    const informe = {
      conduct: this.conduct,
      dateAtend: this.dateAtend,
      pInput: this.pInput,
      pOutput: this.pOutput,
      comeu: this.comeu,
      nTime: this.nTime,
      terapeutas: 1,
    };

    //get os dados em atendidos -> this.info.Nome -> informes -> data
    //Se houver um doc lá puxa os dados e soma
    //Se não, apenas cria o doc
    let data = moment(informe.dateAtend).format('DD-MM-YYYY');
    console.log(this.info.ID);
    this.db.collection('atendidos').doc(this.info.ID).collection('informes').doc(data).get().toPromise()
      .then(doc => {
        if (!doc.exists) {
          this.db.collection('atendidos').doc(this.info.ID).collection('informes').doc(data).set(informe);
          console.log('ainda não há dados para esse dia');
        } else {
          const dadosExistentes = doc.data();
          if (this.pInput < dadosExistentes.pInput) {
            this.pInput = dadosExistentes.pInput;
          }
          if (this.pOutput > dadosExistentes.pOutput) {
            this.pOutput = dadosExistentes.pOutput;
          }
          if (this.comeu === false) {
            this.comeu = dadosExistentes.comeu;
          }
          informe.terapeutas += dadosExistentes.terapeutas;
          const informeFinal = {
            conduct: ((dadosExistentes.conduct * dadosExistentes.terapeutas) + informe.conduct) / informe.terapeutas,
            pOutput: this.pOutput,
            pInput: this.pInput,
            comeu: this.comeu,
            nTime: this.nTime + dadosExistentes.nTime,
            dateAtend: this.dateAtend,
            terapeutas: informe.terapeutas
          }
          this.db.collection('atendidos').doc(this.info.ID).collection('informes').doc(data).set(informeFinal);
          console.log('Já há dados para esse dia');
        }
      })
    console.log(data)
    console.log(informe);

  }
  // Função que chama um alert
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'ATENÇÃO!',
      message: 'Confirma os dados?',
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Enviar',
          handler: () => {
            this.subInform();
            console.log('Yeetz!');
            this.presentToast('Informe enviado com sucesso');
            this.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }


  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });

    toast.present();
  }


  ngOnInit() {
  }

}
