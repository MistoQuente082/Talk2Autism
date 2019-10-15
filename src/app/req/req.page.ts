import { Component, OnInit } from '@angular/core';
import { Item } from 'src/assets/extra/item';
import { ModalController, NavParams } from '@ionic/angular';
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

    if (this.tipo.tipo === 'Fardamentos') {
      var element = document.getElementById('reqModal');
      element.innerHTML = this.fardamentos;
    }

    if (this.tipo.tipo === 'Módulos') {
      var element = document.getElementById('reqModal');
      element.innerHTML = this.modulos;
    }

    if (this.tipo.tipo === 'Reuniões') {
      var element = document.getElementById('reqModal');
      element.innerHTML = this.reunioes;
    }
  }

  sub() {
    console.log(this.mod);
  }

  // Enviar pedido de reunião
  subMeeting(tipo) {
  }

  // Enviar pedido de Modulos
  subModules() {
  }
  // Enviar pedido de fardamento
  subUniform() {
    this.banco.collection("requisicoes").doc("fardamentos").collection("pedidos").doc("PN1").set({
      pedinte: "June 23, 1912",
    });
  }

}
