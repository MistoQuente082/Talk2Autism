import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-env-mensagem',
  templateUrl: './env-mensagem.page.html',
  styleUrls: ['./env-mensagem.page.scss'],
})
export class EnvMensagemPage implements OnInit {

  pessoas: Observable<any[]>;

  constructor(
    public modalCtrl: ModalController,
    navParams: NavParams,
    db: AngularFirestore,
  ) {
    let currentUser = firebase.auth().currentUser; //Consegue o ID do usuário logado
    this.pessoas = db.collection('pais').valueChanges(); //consegue os valores da coelção noticias
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
