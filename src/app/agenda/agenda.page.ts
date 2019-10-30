import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController, NavDelegate, NavParams } from '@ionic/angular';
import { Item } from 'src/assets/extra/item';


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

  info: Item;
  constructor(
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
    const informe = {
      conduct: this.conduct,
      dateAtend: this.dateAtend,
      pInput: this.pInput,
      pOutput: this.pOutput,
      comeu: this.comeu,
      nTime: this.nTime,
    };
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
