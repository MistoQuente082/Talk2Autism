import { Component, OnInit } from '@angular/core';
import { Item } from 'src/assets/extra/item';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { modais } from './modais.html';
import { AngularFirestore } from '@angular/fire/firestore';
import { ObjectUnsubscribedError } from 'rxjs';





@Component({
  selector: 'app-req',
  templateUrl: './req.page.html',
  styleUrls: ['./req.page.scss'],
})
export class ReqPage implements OnInit {
  tipo: any;
  banco: AngularFirestore;

  motivo: string;

  fard = {
    tamanho: '',
    quantidade: '',
  };

  mod = {
    aQnt: '',
    tema: '',
    elementos: '',
    infoAd: '',
    modulos: '',

  };

  reun = {
    motivos: '',
    limHorario: '',
    limData: '',
    datelhes: '',
  };

  public fardamentos = modais.fardamentos;
  public reunioes = modais.reunioes;
  public modulos = modais.modulos;


  constructor(
    public modalCtrl: ModalController,
    public db: AngularFirestore,
    public alertController: AlertController,
    public navParams: NavParams) {
    this.banco = db;
    this.tipo = navParams.get('tipo');

  }

  //Sair da página
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
      element.innerHTML = this.modulos;
    }

    if (this.tipo.nome === 'Reuniões') {
      var element = document.getElementById('reqModal');
      element.innerHTML = this.reunioes;
    }
  }

  // Enviar pedidos
  async submit() {
    console.log('enviando');
    if (this.tipo.status === false) {
      console.log('status=false');
      const alert = await this.alertController.create({
        header: "Algo deu errado",
        message: "Pedidos de " + this.tipo.nome + " não estão sendo disponibilizado no momento",
        buttons: [
          {
            text: 'Fechar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('triste fim');
              this.dismiss();
            }
          }
        ]
      });
      await alert.present();
    } else {
      console.log('status=true');
      if (this.tipo.nome === "Fardamentos") {
        this.banco.collection("requisicoes").doc("fardamentos").collection("pedidos").add();
      }
      if (this.tipo.nome === "Reuniões") {
        this.banco.collection("requisicoes").doc("reunioes").collection("pedidos").add();
      }
      if (this.tipo.nome === "Módulo") {
        this.banco.collection("requisicoes").doc("modulos").collection("pedidos").add();
      }
      this.dismiss();
    }
  }
}
