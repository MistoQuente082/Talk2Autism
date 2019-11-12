import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editar-noticia',
  templateUrl: './editar-noticia.page.html',
  styleUrls: ['./editar-noticia.page.scss'],
})
export class EditarNoticiaPage implements OnInit {
  public noticia;

  public tituloNoticia;
  public descriNoticia;
  public horaNoticia: Date = new Date();


  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
    this.noticia = navParams.get('item');
    this.tituloNoticia = this.noticia.nome;
    this.descriNoticia = this.noticia.mensagem;
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
            this.presentToast('Notícia modificada com sucesso!');

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
      this.presentAlert('Deseja enviar as modificações?');
    }
  }



  // Sair da página
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
