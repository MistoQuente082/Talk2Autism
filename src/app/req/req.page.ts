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

  public fardamentos = modais.fardamentos;
  public reunioes = modais.reunioes;


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
      var element = document.getElementById('teste');
      element.innerHTML = this.fardamentos;
    }

    if (this.tipo.tipo === 'Módulos') {
      var element = document.getElementById('teste');
      element.innerHTML = '<p>cdjcd</p>';
    }

    if (this.tipo.tipo === 'Reuniões') {
      var element = document.getElementById('teste');
      element.innerHTML = this.reunioes;
    }
  }

  // Enviar pedido de reunião
  subMeeting(tipo) {
  }

  // Enviar pedido de fardamento
  subUniform() {
    this.banco.collection("requisicoes").doc("fardamentos").collection("pedidos").doc("PN1").set({
      pedinte: "June 23, 1912",
    });
  }

}
