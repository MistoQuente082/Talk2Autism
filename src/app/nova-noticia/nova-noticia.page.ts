import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-nova-noticia',
  templateUrl: './nova-noticia.page.html',
  styleUrls: ['./nova-noticia.page.scss'],
})
export class NovaNoticiaPage implements OnInit {
  public tituloNoticia;
  public descriNoticia;
  public horaNoticia: Date = new Date();
  public postar: boolean;


  constructor(
    public db: AngularFirestore,
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
            this.db.collection('noticias').add({ tiulo: 'a', }).then(ref => {
              const novaNoticia = {
                titulo: this.tituloNoticia,
                descricao: this.descriNoticia,
                data: this.horaNoticia,
                id: ref.id,
                postar: this.postar
              };
              this.db.collection('noticias').doc(ref.id).set(novaNoticia);
            });
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

  subNoticia(valor: boolean) {
    if (this.tituloNoticia === undefined || this.descriNoticia === undefined) {
      this.presentToast('Preencha os Campos');
    } else {
      this.postar = valor;
      this.presentAlert('Deseja criar a notícia?');
    }
  }

  ngOnInit() {
  }

}
