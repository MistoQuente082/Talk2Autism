import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-nova-noticia',
  templateUrl: './nova-noticia.page.html',
  styleUrls: ['./nova-noticia.page.scss'],
})
export class NovaNoticiaPage implements OnInit {
  public tituloNoticia;
  public descriNoticia;
  public horaNoticia: Date = new Date();


  constructor(
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) { }


  // Sair da página
  async dismiss() {
    await this.modalCtrl.dismiss();
  }


  mudaData(event) {
    this.horaNoticia = new Date(event.detail.value);

  }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Atenção',
      message,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Enviar',
          handler: async () => {
            const novaNoticia = {
              titulo: this.tituloNoticia,
              descricao: this.descriNoticia,
              data: this.horaNoticia
            };
            this.dismiss();
            this.presentToast('Notícia criada com sucesso!');

          }

        }
      ]
    });
    alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  subNoticia() {
    if (this.tituloNoticia === undefined || this.descriNoticia === undefined) {
      this.presentToast('Preencha os Campos');
    } else {
      this.presentAlert('Deseja criar a notícia?');
    }
  }

  ngOnInit() {
  }

}
