import { Component, OnInit } from '@angular/core';
import { Item } from 'src/assets/extra/item';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { modais } from './modais.html';
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




  public fardamentos = modais.fardamentos;
  public reunioes = modais.reunioes;
  public moduloss = modais.modulos;


  constructor(
    public modalCtrl: ModalController,
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

  ngOnInit() {
    console.log(this.tipo);

    if (this.tipo.nome === 'Fardamentos') {
      var element = document.getElementById('reqModal');
      element.innerHTML = this.fardamentos;
    }

    if (this.tipo.nome === 'Módulos') {
      var element = document.getElementById('reqModal');
      element.innerHTML = this.moduloss;
    }

    if (this.tipo.nome === 'Reuniões') {
      var element = document.getElementById('reqModal');
      element.innerHTML = this.reunioes;
    }
  }

  sub() {
    this.subMeeting();

  }

  // Enviar pedido de reunião
  subMeeting() {
    const reun = {
      motivos: this.motivo,
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
  subUniform() {
    const fard = {
      tamanho: this.tamanho,
      quantidade: this.quantidade,
    };
  }

  async submit() {
    console.log('freeishk');
    if (this.tipo.status === false) {
      console.log('wueiwue');
      const alert = await this.alertController.create({
        header: "Algo deu errado",
        message: "Pedidos de " + this.tipo.nome + "Não estão sendo disponibilizado no momento",
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
      await alert.present();
    } else {
      console.log('ahdwwgd');
      this.dismiss();
    }
  }


}
