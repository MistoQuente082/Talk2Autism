import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController, AlertController } from '@ionic/angular';
import { FirebaseFirestore } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-editar-noticia',
  templateUrl: './editar-noticia.page.html',
  styleUrls: ['./editar-noticia.page.scss'],
})
export class EditarNoticiaPage implements OnInit {
  public noticia;
  public postar: boolean;

  public tituloNoticia;
  public descriNoticia;
  public horaNoticia: any;


  constructor(
    public db: AngularFirestore,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
    this.noticia = navParams.get('item');
    this.tituloNoticia = this.noticia.titulo;
    this.descriNoticia = this.noticia.descricao;
    this.horaNoticia = this.noticia.data; 
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
              data: this.horaNoticia,
              postar: this.postar
            };
            console.log(this.noticia.id)
            this.db.collection('noticias').doc(this.noticia.id).update(novaNoticia);
            this.dismiss();
            this.presentToast('Notícia modificada com sucesso!');

          }

        }
      ]
    });
    alert.present();
  }

  async presentAlert1(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Atenção',
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Continuar',
          handler: async () => {
            this.db.collection('noticias').doc(this.noticia.id).delete();
            this.dismiss();
            this.presentToast('Notícia apagada com sucesso!');
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
      console.log(this.noticia);
      this.postar = valor;
      this.presentAlert('Deseja enviar as modificações?');
    }
  }

  excluirNoticia() {
    this.presentAlert1('Tem certeza que deseja excluir essa notícia? (Essa ação não poderá ser desfeita)')
  }



  // Sair da página
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
