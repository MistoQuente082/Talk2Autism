import { Component, OnInit } from '@angular/core';
import { Item } from 'src/assets/extra/item';
import { ModalController, NavParams, AlertController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';






@Component({
  selector: 'app-req',
  templateUrl: './req.page.html',
  styleUrls: ['./req.page.scss'],
})
export class ReqPage implements OnInit {
  tipo: any;
  banco: AngularFirestore;
  fardamento: any;
  reuniao: any;

  modais: number;




  public aQnt: string;
  public tema: string;
  public elementos: string;
  public infoAd: string;
  public modulos: string;
  public motivo: string;
  public limHorario: string;
  public limData: string;
  public detalhes: string;
  public tamanho: string;
  public quantidade: string;




  constructor(
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public db: AngularFirestore,
    public alertController: AlertController,
    public navParams: NavParams) {
    this.banco = db;
    this.tipo = navParams.get('tipo');

  }

  // Sair da página
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  // Mostra um aviso de envio
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Algo deu errado',
      message,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    alert.present();
  }

  ngOnInit() {
    console.log(this.tipo);

    if (this.tipo.nome === 'Fardamentos') {
      this.modais = 1;
    }

    if (this.tipo.nome === 'Módulos') {
      this.modais = 2;
    }

    if (this.tipo.nome === 'Reuniões') {
      this.modais = 3;
    }
  }



  // Enviar pedido de reunião
  subMeeting() {
    const reun = {
      motivo: this.motivo,
      limHorario: this.limHorario,
      limData: this.limData,
      detalhes: this.detalhes,
    };
    console.log(reun);
  }

  // Enviar pedido de Modulos
  subModules() {
    const mod = {
      aQnt: this.aQnt,
      tema: this.tema,
      elementos: this.elementos,
      infoAd: this.infoAd,
      modulos: this.modulos,
    };
  }
  // Enviar pedido de fardamento
  async subUniform() {
    const fard = {
      tamanho: this.tamanho,
      quantidade: this.quantidade,
    };

    // VERIFICA SE PODE FAZER FAZER PEDIDO DE FARDAMENTO
    if (this.tamanho !== undefined && this.quantidade !== undefined) {
      if (this.tipo.status === false) {


        // MOSTRA UMA ALERTA CASO NÃO TIVER DISPONÍVEL
        this.presentAlert('Pedidos de fardamentos não estão disponíveis no momento');
        console.log('Sem fardamento');

      } else {
        console.log('Fardamento foi pedido');
        this.presentToast('Pedido Realizado com Sucesso!');
        this.dismiss();
      }
    } else {
      this.presentAlert('Preencha os campos!');
    }
  }



}
